using AutoMapper;
using AutoMapper.QueryableExtensions;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using UnicornRewards.API.Models;
using UnicornRewards.API.Models.Entities;
using UnicornRewards.API.Models.Request;
using UnicornRewards.API.Models.Response;

namespace UnicornRewards.API.Services
{
    public class UserService : IUserService
    {
        private readonly UnicornRewardsAPIContext _context;
        private readonly UserValidatorService _userValidatorService;
        private readonly IMapper _mapper;

        public UserService(UnicornRewardsAPIContext context, IMapper mapper, UserValidatorService userValidatorService)
        {
            _context = context;
            _mapper = mapper;
            _userValidatorService = userValidatorService;
        }
        public async Task<User> GetByIdAsync(int id)
        {
            User response = _context.Users.First(u => u.Id == id);

            return response;
        }

        public async Task<GenericResponse<ICollection<User>>> GetListByNameAsync(Expression<Func<User, bool>> expression)
        {
            var response = new GenericResponse<ICollection<User>>();

            var list = await _context.Set<User>()
                            .Where(expression)
                            //.ProjectTo<DtoUser>(_mapper.ConfigurationProvider)
                            .ToListAsync();

            response.ResponseResult = list;
            response.Success = true;

            return response;
        }

        public async Task<int> CreateUserAsync(DtoUser request)
        {
            var user = _mapper.Map<User>(request);

            await _context.Set<User>().AddAsync(user);
            await _context.SaveChangesAsync();

            return user.Id;
        }

        public async Task<GenericResponse<int>> UpdateUserAsync(int id, DtoUser request)
        {
            var response = new GenericResponse<int>();

            try
            {
                var user = _mapper.Map<User>(request);
                user.Id = id;

                _context.Attach(user);
                _context.Entry(user).State = EntityState.Modified;

                await _context.SaveChangesAsync();
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = ex.Message;
            }

            return response;
        }

        public async Task<ReadCsvResponse> ReadCsvAsync(List<string> linesList)
        {
            ReadCsvResponse response = new ReadCsvResponse();
            response.Errors = new List<Error>();
            List<User> userList = new List<User>();
            int cont = 0;

            foreach (string line in linesList)
            {
                Error validation_error = new Error();
                validation_error.ValidationErrors = new List<string>();
                response.TotalRowsParsed++;

                if (string.IsNullOrEmpty(line))
                {
                    response.InvalidRows++;
                    validation_error.LineNumber = cont;
                    validation_error.ValidationErrors.Add("Empty Line");
                }
                else
                {
                    try
                    {
                        string[] struser = line.Split(',', 5);
                        if (struser.Length != 5)
                        {
                            response.InvalidRows++;
                            validation_error.LineNumber = cont;
                            validation_error.ValidationErrors.Add("Missing Data Error");
                        }
                        else
                        {
                            if (cont > 0)
                            {
                                //VALID
                                User userModel = new User
                                {
                                    Id = Convert.ToInt32(struser[0]),
                                    Name = struser[1],
                                    UserName = struser[2],
                                    Email = struser[3],
                                    WebSite = struser[4],
                                };
                                ValidationResult result = _userValidatorService.Validate(userModel);

                                if (result.IsValid)
                                {
                                    var idExists = userList.Any(u => u.Id == userModel.Id);
                                    var userNameExists = userList.Any(u => u.UserName == userModel.UserName);
                                    if (idExists)
                                    {
                                        response.InvalidRows++;
                                        validation_error.LineNumber = cont;
                                        validation_error.ValidationErrors.Add("Id Repeated");
                                    }
                                    else if (userNameExists)
                                    {
                                        response.InvalidRows++;
                                        validation_error.LineNumber = cont;
                                        validation_error.ValidationErrors.Add("UserName Repeated");
                                    }
                                    else
                                    {
                                        var user = _mapper.Map<User>(ToDTOUserMap(userModel));

                                        await _context.Users.AddAsync(user);
                                        await _context.SaveChangesAsync();
                                        response.ValidRows++;
                                        userList.Add(userModel);
                                    }
                                }
                                else
                                {
                                    validation_error.LineNumber = cont;
                                    response.InvalidRows++;
                                    foreach (var error in result.Errors)
                                    {
                                        validation_error.ValidationErrors.Add(error.ErrorMessage);
                                    }
                                }
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        response.InvalidRows++;
                        validation_error.LineNumber = cont;
                        validation_error.ValidationErrors.Add("Unformatted line");
                    }
                }
                cont++;
                if (validation_error.LineNumber != 0)
                {
                    response.Errors.Add(validation_error);
                }
            }
            return response;
        }

        private static DtoUser ToDTOUserMap(User user)
        {
            return new DtoUser()
            {
                Name = user.Name,
                UserName = user.UserName,
                Email = user.Email,
                WebSite = user.WebSite
            };
        }
    }
}

using FluentValidation.Results;
using UnicornRewards.API.Models.Response;

namespace UnicornRewards.API.Services
{
    public class ContactService : IContactService
    {
        private readonly UserValidatorService _userValidatorService;

        public ContactService(UserValidatorService userValidatorService)
        {
            _userValidatorService = userValidatorService;
        }

        public async Task<string> AddContactAsync(string id)
        {
            return "Registro Creado: Registro: " + id;
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

                //Inizializar errores
                //errorsList.Add(new Error
                //{
                //    line_number = cont
                //});

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
    }
}

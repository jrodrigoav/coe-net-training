using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UnicornRewards.API.Models.Entities;
using UnicornRewards.API.Models.Request;
using UnicornRewards.API.Services;

namespace UnicornRewards.API.Controllers
{
    [ApiController, Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> getScvContent(IFormCollection collection)
        {
            var file = collection.Files["file"];
            var data = new List<string>();
            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                while (reader.EndOfStream == false)
                {
                    data.Add(reader.ReadLine() ?? string.Empty);
                }
            }

            var response = await _userService.ReadCsvAsync(data);
            return Accepted(response);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var response = await _userService.GetByIdAsync(id);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> Get(string? name)
        {
            try
            {
                var response = await _userService.GetListByNameAsync(x => x.Name.Contains(name ?? string.Empty));
   
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        [HttpPost]
        public async Task<IActionResult> Post(DtoUser request)
        {
            try
            {
                var response = await _userService.CreateUserAsync(request);

                return Created($"{response}", response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Put(int id, DtoUser request)
        {
            try
            {
                var response = await _userService.UpdateUserAsync(id, request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }
    }
}

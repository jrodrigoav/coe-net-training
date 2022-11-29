using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using UnicornRewards.API.Services.Contracts;

namespace UnicornRewards.API.Controllers
{
    [ApiController]
    [Route("api")]
    public class UserController : Controller
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            this._userService = userService;
        }

        [HttpGet("users")]
        public async Task<ActionResult> Users()
        {
            var response = await this._userService.GetAllUsers();

            var users = JsonSerializer.Serialize(response);

            return  Ok(users);
        }
    }
}

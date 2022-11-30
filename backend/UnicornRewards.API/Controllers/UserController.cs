using Microsoft.AspNetCore.Mvc;
using UnicornRewards.API.Models.Models;
using UnicornRewards.API.Services.Services;

namespace UnicornRewards.API.Controllers
{
    [ApiController]
    [Route("api")]
    public class UserController : Controller
    {
        //private IUserService _userService;

        //public UserController(IUserService userService)
        //{
        //    this._userService = userService;
        //}

        [HttpGet("users")]
        public async Task<ActionResult> Users([FromServices] HttpClientService httpClient)
        {
            List<User>? users = await httpClient.GetAllUsers();

            return  Ok(users);
        }
    }
}

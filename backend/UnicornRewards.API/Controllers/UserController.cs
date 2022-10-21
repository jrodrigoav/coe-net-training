using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UnicornRewards.API.Models;
using UnicornRewards.API.Infraestructure;
using UnicornRewards.API.Services;

namespace UnicornRewards.API.Controllers;

[ApiController]
[Route("api/user")]
// [Authorize]
public class UserController : ControllerBase
{
    readonly IUserServices _userServices;

    public UserController(IUserServices userServices)
    {
        _userServices = userServices;
    }

    [HttpGet]
    public async Task<ActionResult<List<User>>> GetAll()
    {
        var users = await _userServices.ListAll();
        return Ok(users);
    }

}

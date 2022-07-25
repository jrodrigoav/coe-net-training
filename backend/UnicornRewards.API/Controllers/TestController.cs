using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UnicornRewards.API.Controllers
{
    [ApiController, Route("api/test"), AllowAnonymous]
    public class TestController : ControllerBase
    {
        [Authorize, HttpGet("auth/{message}")]
        public IActionResult Auth(string message)
        {
            return Ok(new { Message = message });
        }
    }
}
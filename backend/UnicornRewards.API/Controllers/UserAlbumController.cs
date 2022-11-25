using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Linq;
using UnicornRewards.API.Models;
using UnicornRewards.API.Services;

namespace UnicornRewards.API.Controllers
{
    [ApiController, Route("api/userAlbum"), AllowAnonymous]
    public class UserAlbumController : ControllerBase
    {
        [Authorize, HttpGet("getAllAlbums/{message}")]
        public async Task<IActionResult> GetUserAlbum()
        {
            var usersAlbums = new UserAlbumService();
            var result = await usersAlbums.GetAllUserAlbums();            
            return Ok(result);
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UnicornRewards.API.Interface;

namespace UnicornRewards.API.Controllers
{
    [ApiController, Route("api/userAlbum"), AllowAnonymous]
    public class UserAlbumController : ControllerBase
    {
        public readonly IUserAlbumService _userAlbumService;

        public UserAlbumController(IUserAlbumService userAlbumService)
        {
            _userAlbumService = userAlbumService;
        }

        [Authorize, HttpGet("getAllAlbums/{message}")]
        public async Task<IActionResult> GetUserAlbum()
        {
            var result = await _userAlbumService.GetAllUserAlbums();
            return Ok(result);
        }
    }
}

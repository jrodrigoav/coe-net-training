using Microsoft.AspNetCore.Mvc;
using UnicornRewards.API.Models.ViewModels;
using UnicornRewards.API.Services.Services;

namespace UnicornRewards.API.Controllers
{
    [ApiController]
    [Route("api")]
    public class UserAlbumController : Controller
    {
        //private IUserAlbumService _userAlbumsService;

        //public UserAlbumController(IUserAlbumService userAlbumsService)
        //{
        //    this._userAlbumsService = userAlbumsService;
        //}

        [HttpGet("useralbums")]
        public async Task<ActionResult> UserAlbums([FromServices] HttpClientService httpClient)
        {
            List<UserAlbum>? userAlbums = await httpClient.GetAllUserAlbums();

            return  Ok(userAlbums);
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using UnicornRewards.API.Models.Models;
using UnicornRewards.API.Services.Services;

namespace UnicornRewards.API.Controllers
{
    [ApiController]
    [Route("api")]
    public class AlbumController : Controller
    {
        //private IAlbumService _albumService;

        //public AlbumController(IAlbumService albumService)
        //{
        //    this._albumService = albumService;
        //}

        [HttpGet("albums")]
        public async Task<ActionResult> Albums([FromServices] HttpClientService httpClient)
        {
            List<Album>? albums = await httpClient.GetAllAlbums();

            return  Ok(albums);
        }
    }
}

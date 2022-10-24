using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UnicornRewards.API.DTO;
using UnicornRewards.API.Services;

namespace UnicornRewards.API.Controllers
{
    [ApiController, Route("api/albums"), AllowAnonymous]
    public class AlbumController : ControllerBase
    {
        readonly IAlbumServices _albumService;

        public AlbumController(IAlbumServices albumService)
        {
            _albumService = albumService;
        }

        [HttpGet]
        public async Task<IActionResult> ListAllAsync()
        {
            var albums = await _albumService.ListAll();
            return Ok(albums);
        }
    }
}
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Schema;
using System.Text.Json;
using UnicornRewards.API.Models;
using UnicornRewards.API.Services;

namespace UnicornRewards.API.Controllers
{
    [ApiController]
    public class AlbumController : ControllerBase
    {
        private readonly IAlbumService _albumService;
        public AlbumController(IAlbumService albumService)
        {
            this._albumService = albumService;
        }

        [HttpGet]
        [Route("api/albums")]
        public async Task<IActionResult> GetAlbums([FromQuery] int? userId)
        {
            if (userId == null)
            {
                return BadRequest("Invalid");
            }

            var response = await _albumService.GetAlbums((int)userId);
            return Ok(response);
        }

        [HttpPost]
        [Route("api/albums")]
        public async Task<IActionResult> AddAlbums([FromBody] JsonElement body)
        {
            var jsonAlbums =  body.ToString();
            if (jsonAlbums == null)
            {
                return BadRequest("Invalid Json");
            }

            List<Album> albums = new List<Album>();
            try
            {
                albums = JsonConvert.DeserializeObject<List<Album>>(jsonAlbums);
            }
            catch
            {
                return BadRequest("Invalid Json");
            }

            string response = await _albumService.AddAlbums(albums);
            return Accepted(response);
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using UnicornRewards.API.Models.Models;

namespace UnicornRewards.API.Controllers
{
    [ApiController]
    [Route("[action]")]
    public class UserAlbumController : Controller
    {
        [HttpGet]
        public async Task<ActionResult> UserAlbums()
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("https://jsonplaceholder.typicode.com");

            var usersResponse = await client.GetAsync("/users");
            var usersJsonResponse = await usersResponse.Content.ReadAsStringAsync();

            var albumsResponse = await client.GetAsync("/albums");
            var albumsJsonResponse = await albumsResponse.Content.ReadAsStringAsync();

            List<User> users = new List<User>();
            List<Album> albums = new List<Album>();

            users = JsonSerializer.Deserialize<List<User>>(usersJsonResponse);
            albums = JsonSerializer.Deserialize<List<Album>>(albumsJsonResponse);

            var userAlbums = users.Join(albums, u => u.Id, a => a.UserId, (a, b) => new { a.Username, a.Email, b.Title });

            return  Ok(userAlbums);
        }
    }
}

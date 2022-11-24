using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Linq;
using UnicornRewards.API.Models;

namespace UnicornRewards.API.Controllers
{
    [ApiController, Route("api/userAlbum"), AllowAnonymous]
    public class UserAlbumController : ControllerBase
    {
        [Authorize, HttpGet("getAllAlbums/{message}")]
        public async Task<IActionResult> GetUserAlbum()
        {
            var usersList = await GetAllUsers();
            var albumsList = await GetAllAlbums();
            if (string.IsNullOrEmpty(usersList) || string.IsNullOrEmpty(albumsList) ) 
            {
                var res = new UserAlbum();
                return Ok(res);
            }
            var users = JsonConvert.DeserializeObject<List<User>>(usersList);
            var albums = JsonConvert.DeserializeObject<List<Album>>(albumsList);

            var result = from u in users
                         join a in albums on u.Id equals a.UserId into ua
                         select new UserAlbum
                         {
                             Id = u.Id,
                             Name = u.Name,
                             Email= u.Email,
                             AlbumName = ua.Where(x => x.UserId == u.Id).Select(y => y.Title).ToList(),
                         };
            
            return Ok(result);
        }

        private async Task<string> GetAllUsers()
        {
            try
            {
                using var client = new HttpClient();
                var content = await client.GetAsync("https://jsonplaceholder.typicode.com/users");
                var result = await content.Content.ReadAsStringAsync();
                if (content.StatusCode.ToString() != "OK")
                {
                    return string.Empty;
                }
                return result;
            }
            catch (Exception)
            {
                return string.Empty;
            }
        }

        private async Task<string> GetAllAlbums()
        {
            try
            {
                using var client = new HttpClient();
                var content = await client.GetAsync("https://jsonplaceholder.typicode.com/albums");
                var result = await content.Content.ReadAsStringAsync();
                if (content.StatusCode.ToString() != "OK")
                {
                    return string.Empty;
                }
                return result;
            }
            catch (Exception)
            {
                return string.Empty;
            }
        }
    }
}

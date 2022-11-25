using System.Text.Json;
using UnicornRewards.API.Models;

namespace UnicornRewards.API.Services
{
    public class UserAlbumService
    {
        public async Task<List<UserAlbum>> GetAllUserAlbums()
        {
            var usersList = await GetAllUsers();
            var albumsList = await GetAllAlbums();
            if (string.IsNullOrEmpty(usersList) || string.IsNullOrEmpty(albumsList))
            {
                var res = new List<UserAlbum>();
                return res;
            }
            var users = JsonSerializer.Deserialize<List<User>>(usersList, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
            var albums = JsonSerializer.Deserialize<List<Album>>(albumsList, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            var result = from u in users
                         join a in albums on u.Id equals a.UserId into ua
                         select new UserAlbum
                         {
                             Id = u.Id,
                             Name = u.Name,
                             Email = u.Email,
                             AlbumName = ua.Where(x => x.UserId == u.Id).Select(y => y.Title).ToList(),
                         };

            return result.ToList();
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

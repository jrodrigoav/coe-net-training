using System.Net.Http.Json;
using UnicornRewards.API.Models.Models;
using UnicornRewards.API.Models.ViewModels;

namespace UnicornRewards.API.Services.Services
{
    public class HttpClientService
    {
        private readonly HttpClient _httpClient;

        public HttpClientService(HttpClient httpClient)
        {
            this._httpClient = httpClient;
            this._httpClient.BaseAddress = new Uri("https://jsonplaceholder.typicode.com/");
        }

        public async Task<List<User>?> GetAllUsers()
        {
            return await _httpClient.GetFromJsonAsync<List<User>>("users");
        }

        public async Task<List<Album>?> GetAllAlbums()
        {
            return await _httpClient.GetFromJsonAsync<List<Album>>("albums");
        }

        public async Task<List<UserAlbum>?> GetAllUserAlbums()
        {
            List<User>? users = await this.GetAllUsers();
            List<Album>? albums = await this.GetAllAlbums();

            List<UserAlbum>? userAlbums = users?.Join(albums, u => u.Id, a => a.UserId, (u, a) => new UserAlbum { UserName = u.Username, Email = u.Email, Title = a.Title }).ToList() ?? Array.Empty<UserAlbum>().ToList();

            return userAlbums;
        }
    }
}

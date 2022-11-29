using System.Text.Json;
using UnicornRewards.API.Interface;
using UnicornRewards.API.Models;

namespace UnicornRewards.API.Services
{
    public class UnicornService : IUnicorn
    {
        private readonly IHttpClientFactory _httpClientFactory = null!;
        private readonly IConfiguration _configuration;
        public UnicornService(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
        }
        public async Task<List<Album>> GetAllbums()
        {
            using HttpClient client = _httpClientFactory.CreateClient();
            try
            {
                var url = _configuration.GetValue<string>("endPointsUrl");
                var albumUrl = $"{url}/albums";
                var content = await client.GetAsync(albumUrl);
                var albums = await content.Content.ReadAsStringAsync();
                if (content.StatusCode.ToString() != "OK")
                {
                    return new List<Album>();
                }
                var result = JsonSerializer.Deserialize<List<Album>>(albums, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
                return result;
            }
            catch (Exception)
            {
                return new List<Album>();
            }
        }

        public async Task<List<User>> GetAllUsers()
        {
            using HttpClient client = _httpClientFactory.CreateClient();
            try
            {
                var url = _configuration.GetValue<string>("endPointsUrl");
                var usersUrl = $"{url}/users";
                var content = await client.GetAsync(usersUrl);
                var users = await content.Content.ReadAsStringAsync();
                if (content.StatusCode.ToString() != "OK")
                {
                    return new List<User>();
                }
                var result = JsonSerializer.Deserialize<List<User>>(users, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
                return result;
            }
            catch (Exception)
            {
                return new List<User>();
            }
        }
    }
}

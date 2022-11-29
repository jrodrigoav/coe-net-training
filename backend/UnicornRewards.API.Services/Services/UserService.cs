using System.Text.Json;
using UnicornRewards.API.Models.Models;
using UnicornRewards.API.Services.Contracts;

namespace UnicornRewards.API.Services.Services
{
    public class UserService : IUserService
    {
        public List<User> Users { get; set; }

        private IBaseHttpClientService _httpClientService;

        public UserService(IBaseHttpClientService baseHttpClientService)
        {
            this._httpClientService = baseHttpClientService;
        }

        public async Task<List<User>> GetAllUsers()
        {
            var response = await this._httpClientService.Client.GetAsync("users");

            var jsonResponse = await response.Content.ReadAsStringAsync();

            this.Users = JsonSerializer.Deserialize<List<User>>(jsonResponse);

            return this.Users;
        }
    }
}

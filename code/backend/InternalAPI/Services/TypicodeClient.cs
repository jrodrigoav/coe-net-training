using InternalAPI.Models;
using InternalAPI.Models.Typicode;
using Microsoft.Extensions.Options;

namespace InternalAPI.Services
{
    public class TypicodeClient
    {
        private readonly HttpClient _client;

        public TypicodeClient(HttpClient client,IOptionsMonitor<TypicodeSettings> optionsMonitor)
        {
            _client = client;
            _client.BaseAddress = optionsMonitor.CurrentValue.ApiUrl;
        }

        public async Task<User[]> GetUsersAsync()
        {
            var users = (await _client.GetFromJsonAsync<User[]>("users")) ?? Array.Empty<User>();
            return users;
        }
    }
}

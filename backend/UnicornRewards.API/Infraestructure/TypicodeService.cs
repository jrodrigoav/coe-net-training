using Microsoft.Extensions.Caching.Memory;
using UnicornRewards.API.Exceptions;
using UnicornRewards.API.Models;

namespace UnicornRewards.API.Infraestructure;

public class TypicodeService : ITypicodeService
{
    const string usersCacheKey = "usersList";

    readonly HttpClient _httpClient;
    readonly IMemoryCache _memoryCache;

    public TypicodeService(HttpClient httpClient, IMemoryCache memoryCache)
    {
        _httpClient = httpClient;
        _memoryCache = memoryCache;
    }

    public async Task<List<User>> GetAllUsers()
    {
        List<User> users = null!;

        if (!_memoryCache.TryGetValue(usersCacheKey, out users))
        {
            try
            {
                var resp = await this._httpClient.GetAsync("/users");
                users = (await resp.Content.ReadFromJsonAsync<List<User>>())!;
            }
            catch (Exception ex)
            {
                throw new ServiceErrorResponseException("typicode/user", ex.Message);
            }

            _memoryCache.Set<List<User>>(
                usersCacheKey,
                users,
                new MemoryCacheEntryOptions()
                    .SetSize(1)
                    .SetSlidingExpiration(TimeSpan.FromMinutes(15))
                    .SetAbsoluteExpiration(TimeSpan.FromHours(1))
            );
        }

        return users;
    }

    public async Task<List<Album>> GetAllAbums()
    {
        List<Album> albums = null!;
        try
        {
            var resp = await this._httpClient.GetAsync("/albums");
            albums = (await resp.Content.ReadFromJsonAsync<List<Album>>())!;
        }
        catch (Exception ex)
        {
            throw new ServiceErrorResponseException("typicode/album", ex.Message);
        }
        return albums;
    }
}
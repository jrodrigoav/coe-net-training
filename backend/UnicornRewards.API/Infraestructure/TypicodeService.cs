using Microsoft.Extensions.Caching.Memory;
using UnicornRewards.API.Exceptions;
using UnicornRewards.API.Models;

namespace UnicornRewards.API.Infraestructure;

public class TypicodeService : ITypicodeService
{
    readonly HttpClient _httpClient;

    public TypicodeService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<User>> GetAllUsers()
    {
        List<User> users = null!;
        try
        {
            var resp = await this._httpClient.GetAsync("/users");
            users = (await resp.Content.ReadFromJsonAsync<List<User>>())!;
        }
        catch (Exception ex)
        {
            throw new ServiceErrorResponseException("typicode/user", ex.Message);
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
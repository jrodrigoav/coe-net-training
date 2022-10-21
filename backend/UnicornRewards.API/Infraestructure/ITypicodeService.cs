using UnicornRewards.API.Models;

namespace UnicornRewards.API.Infraestructure;

public interface ITypicodeService
{
    Task<List<User>> GetAllUsers();
    Task<List<Album>> GetAllAbums();
}
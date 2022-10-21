using UnicornRewards.API.DTO;

namespace UnicornRewards.API.Services;

public interface IUserServices
{
    Task<List<UserDTO>> ListAll();
}
using UnicornRewards.API.DTO;
using UnicornRewards.API.Infraestructure;

namespace UnicornRewards.API.Services;

public class UserServices : IUserServices
{
    readonly ITypicodeService _typicodeService;
    public UserServices(ITypicodeService typicodeService)
    {
        _typicodeService = typicodeService;
    }

    public async Task<List<UserDTO>> ListAll()
    {
        var users = await _typicodeService.GetAllUsers();
        var usersDto = users.Select(u => new UserDTO()
        {
            Id = u.Id,
            Name = u.Name,
            Username = u.Username,
            Email = u.Email,
            Phone = u.Phone,
        });

        return usersDto.ToList();
    }
}
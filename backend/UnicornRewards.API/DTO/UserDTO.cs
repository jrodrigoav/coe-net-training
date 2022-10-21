using UnicornRewards.API.Models;

namespace UnicornRewards.API.DTO;

public class UserDTO
{
    public UserDTO() { }

    public UserDTO(User user)
    {
        Id = user.Id;
        Name = user.Name;
        Username = user.Username;
        Email = user.Email;
        Phone = user.Phone;
    }

    public int Id { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string Username { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string Phone { get; set; } = default!;
}
namespace UnicornRewards.API.DTO;

public class UserDTO
{
    public int Id { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string Username { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string Phone { get; set; } = default!;
}
namespace UnicornRewards.API.DTO;

public class AlbumDTO
{
    public int Id { get; set; } = default!;
    public string Title { get; set; } = default!;
    public int UserId { get; set; } = default!;
    public UserDTO User { get; set; } = default!;
}
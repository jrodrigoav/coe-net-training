namespace UnicornRewards.API.Models
{
    public class UserAlbum
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public List<string>? AlbumName { get; set; }
    }
}

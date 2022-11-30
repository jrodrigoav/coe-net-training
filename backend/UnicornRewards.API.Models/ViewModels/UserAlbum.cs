using System.Text.Json.Serialization;

namespace UnicornRewards.API.Models.ViewModels
{
    public class UserAlbum
    {
        [JsonPropertyName("username")]
        public string? UserName { get; set; }
        [JsonPropertyName("email")]
        public string? Email { get; set; }
        [JsonPropertyName("title")]
        public string? Title { get; set; }
    }
}

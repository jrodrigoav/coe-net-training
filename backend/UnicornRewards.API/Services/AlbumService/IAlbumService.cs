using UnicornRewards.API.Models;

namespace UnicornRewards.API.Services
{
    public interface IAlbumService
    {
        Task<List<Album>> GetAlbums(int userId);
        Task<string> AddAlbums(List<Album> albums);
    }
}

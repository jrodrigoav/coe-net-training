using UnicornRewards.API.Models.Models;

namespace UnicornRewards.API.Services.Contracts
{
    public interface IAlbumService
    {
        public Task<List<Album>> GetAllAlbums();
    }
}

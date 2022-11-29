using UnicornRewards.API.Models;

namespace UnicornRewards.API.Interface
{
    public interface IUserAlbumService
    {
        public Task<List<UserAlbum>> GetAllUserAlbums();
    }
}

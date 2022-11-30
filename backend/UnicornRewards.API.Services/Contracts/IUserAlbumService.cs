using UnicornRewards.API.Models.ViewModels;

namespace UnicornRewards.API.Services.Contracts
{
    public interface IUserAlbumService
    {
        public Task<List<UserAlbum>> GetAllUserAlbums();
    }
}

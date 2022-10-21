using UnicornRewards.API.DTO;

namespace UnicornRewards.API.Services;

public interface IAlbumServices
{
    Task<List<AlbumDTO>> ListAll();
}
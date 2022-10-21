using UnicornRewards.API.DTO;
using UnicornRewards.API.Infraestructure;

namespace UnicornRewards.API.Services;

public class AlbumServices : IAlbumServices
{
    readonly ITypicodeService _typicodeService;
    public AlbumServices(ITypicodeService typicodeService)
    {
        _typicodeService = typicodeService;
    }

    public async Task<List<AlbumDTO>> ListAll()
    {
        var users = await _typicodeService.GetAllUsers();
        var albums = await _typicodeService.GetAllAbums();

        var albumsDTO = albums.Join(
            users,
            album => album.UserId,
            user => user.Id,
            (album, user) => new AlbumDTO()
            {
                Id = album.Id,
                Title = album.Title,
                UserId = album.UserId,
                User = new UserDTO(user)
            }
        );

        return albumsDTO.ToList();
    }
}
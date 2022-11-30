using UnicornRewards.API.Models.Models;
using UnicornRewards.API.Models.ViewModels;
using UnicornRewards.API.Services.Contracts;

namespace UnicornRewards.API.Services.Services
{
    public class UserAlbumService //: IUserAlbumService
    {
        //public List<UserAlbum> UserAlbums { get; set; }

        //private IUserService _userService;
        //private IAlbumService _albumService;

        //public UserAlbumService(IUserService userService, IAlbumService albumService)
        //{
        //    this._userService = userService;
        //    this._albumService = albumService;
        //}

        //public async Task<List<UserAlbum>> GetAllUserAlbums()
        //{
        //    List<User> users = await this._userService.GetAllUsers();
        //    List<Album> albums = await this._albumService.GetAllAlbums();

        //    this.UserAlbums = users.Join(albums, u => u.Id, a => a.UserId, (a, b) => new UserAlbum { UserName = a.Username, Email = a.Email, Title = b.Title }).ToList();

        //    return this.UserAlbums;
        //}
    }
}

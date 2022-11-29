using UnicornRewards.API.Interface;
using UnicornRewards.API.Models;

namespace UnicornRewards.API.Services
{
    public class UserAlbumService : IUserAlbumService
    {
        public readonly IUnicorn _unicorn;

        public UserAlbumService(IUnicorn unicorn)
        {
            _unicorn = unicorn;
        }
        public async Task<List<UserAlbum>> GetAllUserAlbums()
        {
            var albumList = await _unicorn.GetAllbums();
            var userList = await _unicorn.GetAllUsers();
            if (userList.Count == 0)
            {
                return new List<UserAlbum>();
            }

            var result = from u in userList
                         join a in albumList on u.Id equals a.UserId into ua
                         select new UserAlbum
                         {
                             Id = u.Id,
                             Name = u.Name,
                             Email = u.Email,
                             AlbumName = ua.Where(x => x.UserId == u.Id).Select(y => y.Title).ToList(),
                         };

            return result.ToList();
        }
    }
}

using UnicornRewards.API.Models;

namespace UnicornRewards.API.Database
{
    public interface IUnicornRepository
    {

        List<Album> GetAlbumsByUser(int userId);

        void AddAlbums(List<Album> albums);

        void SaveChanges();
    }
}

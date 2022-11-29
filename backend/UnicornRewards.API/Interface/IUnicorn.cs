using UnicornRewards.API.Models;

namespace UnicornRewards.API.Interface
{
    public interface IUnicorn
    {
        public Task<List<User>> GetAllUsers();
        public Task<List<Album>> GetAllbums();
    }
}

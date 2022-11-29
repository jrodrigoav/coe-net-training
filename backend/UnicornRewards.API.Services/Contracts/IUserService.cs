using UnicornRewards.API.Models.Models;

namespace UnicornRewards.API.Services.Contracts
{
    public interface IUserService
    {
        public Task<List<User>> GetAllUsers();
    }
}

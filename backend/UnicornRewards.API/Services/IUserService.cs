using System.Linq.Expressions;
using UnicornRewards.API.Models.Entities;
using UnicornRewards.API.Models.Request;
using UnicornRewards.API.Models.Response;

namespace UnicornRewards.API.Services
{
    public interface IUserService
    {
        Task<User> GetByIdAsync(int id);

        Task<GenericResponse<ICollection<User>>> GetListByNameAsync(Expression<Func<User, bool>> expression);

        Task<int> CreateUserAsync(DtoUser request);

        Task<GenericResponse<int>> UpdateUserAsync(int id, DtoUser request);

        Task<ReadCsvResponse> ReadCsvAsync(List<string> data);
    }
}

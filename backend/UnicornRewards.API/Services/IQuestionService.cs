using System.Linq.Expressions;
using UnicornRewards.API.Models.Entities;
using UnicornRewards.API.Models.Request;

namespace UnicornRewards.API.Services
{
    public interface IQuestionService
    {
        Task<GenericResponse<ICollection<Tab>>> GetTabsListAsync(Expression<Func<Tab, bool>> expression);

        Task<bool> DeleteTabAsync(int id);

        Task<int> CreateTabAsync(DtoTab model);

        Task<GenericResponse<ICollection<Question>>> GetQuestionsAsync(Expression<Func<Question, bool>> expression);

        Task<int> CreateQuestionAsync(DtoQuestion model);

        Task<List<string>> GetSugestedAnswersAsync(int idQuestion);
    }
}

using FluentValidation.Results;
using UnicornRewards.API.Models.Response;

namespace UnicornRewards.API.Services
{
    public interface IContactService
    {
        Task<string> AddContactAsync(string id);
        Task<ReadCsvResponse> ReadCsvAsync(List<string> data);
    }
}

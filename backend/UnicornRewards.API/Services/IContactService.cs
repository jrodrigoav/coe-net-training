namespace UnicornRewards.API.Services
{
    public interface IContactService
    {
        Task<string> AddContactAsync(string id);
    }
}

namespace UnicornRewards.API.Services
{
    public interface IContactService<T>
    {
        Task<T> AddContactAsync(T id);
    }
}

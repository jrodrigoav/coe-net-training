namespace UnicornRewards.API.Services
{
    public interface IContactService<T>
    {
        Task<T> AddContact(T id);
    }
}

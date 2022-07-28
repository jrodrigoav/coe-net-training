namespace UnicornRewards.API.Services
{
    public class ContactService : IContactService<string>
    {
        public async Task<string> AddContact(string id)
        {
            return "Registro Creado: Registro: " + id;
        }
    }
}

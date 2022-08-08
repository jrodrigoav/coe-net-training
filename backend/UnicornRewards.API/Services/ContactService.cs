namespace UnicornRewards.API.Services
{
    public class ContactService : IContactService
    {
        private readonly UserValidatorService _userValidatorService;

        public ContactService(UserValidatorService userValidatorService)
        {
            _userValidatorService = userValidatorService;
        }

        public async Task<string> AddContactAsync(string id)
        {
            return "Registro Creado: Registro: " + id;
        }
    }
}

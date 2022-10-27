using UnicornRewards.API.Models;

namespace UnicornRewards.API.Infraestructure;

public interface ICountryServices
{
    Task<Country> GetCountryByIsoCodeAsync(string isoCode);
    Task<ICollection<Country>> GetAllCountriesAsync();
}

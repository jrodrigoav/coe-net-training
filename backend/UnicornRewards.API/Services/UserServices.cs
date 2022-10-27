using Microsoft.Identity.Client;
using UnicornRewards.API.DTO;
using UnicornRewards.API.Infraestructure;

namespace UnicornRewards.API.Services;

public class UserServices : IUserServices
{
    private List<string> COUNTRY_CODES = new List<string>() { "AX", "AF", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BQ", "BA", "BW", "BV", "BR", "IO", "BN", "BG", "BF", "BI", "CI", "KH", "CM", "CA", "CV", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "MF", "CO", "KM", "CG", "CD", "CK", "CR", "HR", "CU", "CW", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GN", "GW", "GY", "HT", "HM", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IL", "IT", "JM", "JP", "JO", "KZ", "KE", "KI", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "AN", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "KP", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "PM", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "KR", "ES", "LK", "KN", "LC", "VC", "SD", "SR", "SJ", "SZ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU", "VA", "VE", "VN", "VG", "VI", "WF", "EH", "WS", "YE", "ZM", "ZW" };

    readonly ITypicodeService _typicodeService;
    readonly ICountryServices _countryService;

    public UserServices(ITypicodeService typicodeService, ICountryServices countryServices)
    {
        _typicodeService = typicodeService;
        _countryService = countryServices;
    }

    public async Task<List<UserDTO>> ListAll()
    {
        var users = await _typicodeService.GetAllUsers();
        var countries = await this._countryService.GetAllCountriesAsync();

        //var usersDto = users.Select(u => new UserDTO()
        //{
        //    Id = u.Id,
        //    Name = u.Name,
        //    Username = u.Username,
        //    Email = u.Email,
        //    Phone = u.Phone,
        //    CountryId = RandomCountryCode(u.Address.City)
        //});

        var usersDto = users.Join(
            countries,
            u => RandomCountryCode(u.Phone),
            c => c.ISOCode,
            (user, country) => new UserDTO()
            {
                Id = user.Id,
                Name = user.Name,
                Username = user.Username,
                Email = user.Email,
                Phone = user.Phone,
                CountryId = country.ISOCode,
                Country = new CountryDTO(country)
            }
        );

        return usersDto.ToList();
    }

    private string RandomCountryCode(string s)
    {
        var idx = Math.Abs(s.GetHashCode()) % COUNTRY_CODES.Count;
        return COUNTRY_CODES[idx];
    }
}
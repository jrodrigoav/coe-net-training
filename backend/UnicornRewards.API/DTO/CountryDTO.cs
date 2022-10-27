using UnicornRewards.API.Models;

namespace UnicornRewards.API.DTO;

public class CountryDTO
{
    public CountryDTO() { }

    public CountryDTO(Country country)
    {
        Id = country.ISOCode;
        Name = country.Name;
        Flag = country.CountryFlag;
        CurrencyCode = country.CurrencyCode; 
    }

    public string Id { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string Flag { get; set; } = default!;
    public string CurrencyCode { get; set; } = default!;
}
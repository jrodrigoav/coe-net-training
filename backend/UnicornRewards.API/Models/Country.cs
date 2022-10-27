using OorsprongCountryInfoService;

namespace UnicornRewards.API.Models;

public class Country
{
    public Country() { }

    public Country(tCountryInfo countryInfo)
    {
        ISOCode = countryInfo.sISOCode;
        Name = countryInfo.sName;
        CapitalCity = countryInfo.sCapitalCity;
        PhoneCode = countryInfo.sPhoneCode;
        ContinentCode = countryInfo.sContinentCode;
        CurrencyCode = countryInfo.sCurrencyISOCode;
        CountryFlag = countryInfo.sCountryFlag;
        Languages = countryInfo.Languages
            .Select(lang => new Language() { ISOCode = lang.sISOCode, Name = lang.sName })
            .ToList();
    }

    public string ISOCode { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string CapitalCity { get; set; } = default!;
    public string PhoneCode { get; set; } = default!;
    public string ContinentCode { get; set; } = default!;
    public string CurrencyCode { get; set; } = default!;
    public string CountryFlag { get; set; } = default!;
    public ICollection<Language> Languages { get; set; } = default!;
}
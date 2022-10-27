using OorsprongCountryInfoService;
using UnicornRewards.API.Exceptions;
using UnicornRewards.API.Models;

namespace UnicornRewards.API.Infraestructure;

public class OorsprongCountryServices : ICountryServices
{
    private readonly CountryInfoServiceSoapTypeClient _client;

    public OorsprongCountryServices()
    {
        _client = new CountryInfoServiceSoapTypeClient(CountryInfoServiceSoapTypeClient.EndpointConfiguration.CountryInfoServiceSoap12);
    }

    public async Task<Country> GetCountryByIsoCodeAsync(string isoCode)
    {
        FullCountryInfoResponse countryInfoResponse;
        try
        {
            countryInfoResponse = await _client.FullCountryInfoAsync(isoCode);
        }
        catch (Exception ex)
        {
            throw new ServiceErrorResponseException("OorsprongCountryServices", ex.Message);
        }

        return new Country(countryInfoResponse.Body.FullCountryInfoResult);
    }

    public async Task<ICollection< Country>> GetAllCountriesAsync()
    {
        FullCountryInfoAllCountriesResponse countriesResponse;
        try
        {
            countriesResponse = await _client.FullCountryInfoAllCountriesAsync();
        }
        catch (Exception ex)
        {
            throw new ServiceErrorResponseException("OorsprongCountryServices", ex.Message);
        }

        return countriesResponse.Body.FullCountryInfoAllCountriesResult
            .Select( tCountry => new Country(tCountry) )
            .ToList();
    }
}

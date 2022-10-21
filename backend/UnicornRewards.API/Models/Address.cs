namespace UnicornRewards.API.Models;

public class Address
{
    public string Street { get; set; } = default!;
    public string Suite { get; set; } = default!;
    public string City { get; set; } = default!;
    public string Zipcode { get; set; } = default!;
    public Geolocalization Geo { get; set; } = default!;
}
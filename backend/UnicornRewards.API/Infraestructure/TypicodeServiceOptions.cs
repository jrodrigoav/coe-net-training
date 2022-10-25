using Microsoft.Extensions.Caching.Memory;
using UnicornRewards.API.Exceptions;
using UnicornRewards.API.Models;

namespace UnicornRewards.API.Infraestructure;

public class TypicodeServiceOptions
{
    public const string SECTION = "TypicodeService";

    public string Url { get; set; } = default!;
    public int Timeout_ms { get; set; } = 1000;
}
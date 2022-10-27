using Microsoft.Identity.Web;
using OorsprongCountryInfoService;
using Serilog;
using UnicornRewards.API.Infraestructure;
using UnicornRewards.API.Services;

const string AllowLocalhostCORSPolicy = "AllowLocalhostCORSPolicy";

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((hostContext, services, configuration) =>
{
    configuration.WriteTo.Console();
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowLocalhostCORSPolicy,
                      policy =>
                      {
                          policy.WithHeaders("Authorization", "Accept", "Referer", "User-Agent");
                          policy.WithOrigins("http://localhost:4200");
                      });
});
builder.Services.AddMicrosoftIdentityWebApiAuthentication(builder.Configuration, "AzureAd");
builder.Services.AddControllers();


builder.Services.Configure<TypicodeServiceOptions>(
    builder.Configuration.GetSection(TypicodeServiceOptions.SECTION)
);

builder.Services.AddHttpClient<ITypicodeService, TypicodeService>();
builder.Services.AddScoped<ICountryServices, OorsprongCountryServices>();

builder.Services.AddScoped<IUserServices, UserServices>();
builder.Services.AddScoped<IAlbumServices, AlbumServices>();


builder.Services.AddMemoryCache(config =>
{
    config.SizeLimit = 1024;
});

var app = builder.Build();
app.UseSerilogRequestLogging();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors(AllowLocalhostCORSPolicy);
app.MapGet("/", () => "Unicorn Rewards");
app.MapControllers();

app.Run();

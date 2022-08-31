using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using Serilog;
using UnicornRewards.API.Database;
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
                          policy.WithMethods("GET", "PUT", "POST");
                          policy.AllowAnyHeader();
                      });
});
builder.Services.AddMicrosoftIdentityWebApiAuthentication(builder.Configuration, "AzureAd");
builder.Services.AddControllers();
builder.Services.AddScoped<IContactService<string>, ContactService>();
builder.Services.AddScoped<IAlbumService, AlbumService>();
builder.Services.AddDbContext<ApiContext>(opt => { 
    opt.UseInMemoryDatabase("testDb"); 
    opt.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
    opt.EnableSensitiveDataLogging(); 
});
builder.Services.AddScoped<IUnicornRepository, UnicornRepository>();
builder.Services.AddCors();
var app = builder.Build();
app.UseSerilogRequestLogging();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors(AllowLocalhostCORSPolicy);
app.MapGet("/", () => "Unicorn Rewards");
app.MapControllers();
app.Run();

using Microsoft.Identity.Web;
using Serilog;
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
                      });
});
builder.Services.AddMicrosoftIdentityWebApiAuthentication(builder.Configuration, "AzureAd");
builder.Services.AddControllers();
builder.Services.AddCors();

builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddSingleton<UserValidatorService>();

var app = builder.Build();
app.UseSerilogRequestLogging();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors(AllowLocalhostCORSPolicy);
app.MapGet("/", () => "Unicorn Rewards");
app.MapControllers();
app.Run();

using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Identity.Web;
using Serilog;
using UnicornRewards.API.Interface;
using UnicornRewards.API.Services;

const string AllowLocalhostCORSPolicy = "AllowLocalhostCORSPolicy";
var builder = WebApplication.CreateBuilder(args);
//var provider = new FileExtensionContentTypeProvider();
//provider.Mappings.Add(".pdf", "application/pdf");
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
builder.Services.AddHttpClient<IUnicorn, UnicornService>();
builder.Services.AddScoped<IUnicorn, UnicornService>();
builder.Services.AddScoped<IUserAlbumService, UserAlbumService>();
var app = builder.Build();
app.UseStaticFiles();
app.UseSerilogRequestLogging();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors(AllowLocalhostCORSPolicy);
app.MapGet("/", () => "Unicorn Rewards");
app.MapControllers();
app.Run();

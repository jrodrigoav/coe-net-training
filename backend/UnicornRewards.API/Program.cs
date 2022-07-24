using Microsoft.Identity.Web;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddMicrosoftIdentityWebApiAuthentication(builder.Configuration, "AzureAd");
var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.MapGet("/", () => "Unicorn Rewards");
app.MapControllers();
app.Run();

using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using Serilog;
using UnicornRewards.API.Models;
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
                          policy.WithHeaders("Authorization", "Accept", "Referer", "User-Agent", "Content-Type");
                          policy.WithOrigins("http://localhost:4200");
                          policy.WithMethods("GET", "PUT", "POST", "DELETE");
                          policy.AllowAnyHeader();
                      });
});
//Usar Automapper
builder.Services.AddAutoMapper(options => options.AddProfile<AutoMapperProfiles>());
builder.Services.AddDbContext<UnicornRewardsAPIContext>(options =>
{
    options.UseInMemoryDatabase("UnicornRewards");
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

builder.Services.AddTransient<UnicornRewardsContextSeed>();
builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IQuestionService, QuestionService>();
builder.Services.AddSingleton<UserValidatorService>();

var app = builder.Build();

//if (app.Environment.IsDevelopment())
//{
//    using (var scope = app.Services.CreateScope())
//    {
//        using var db = scope.ServiceProvider.GetService<UnicornRewardsAPIContext>();
//        if (db is not null)
//        {
//            await db.Database.MigrateAsync();
//        }
//    }
//}

SeedData(app);

void SeedData(IHost app)
{
    var scopedFactory = app.Services.GetService<IServiceScopeFactory>();

    using (var scope = scopedFactory.CreateScope())
    {
        var service = scope.ServiceProvider.GetService<UnicornRewardsContextSeed>();
        service.SeedAsync();
    }
}

app.UseSerilogRequestLogging();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors(AllowLocalhostCORSPolicy);
app.MapGet("/", () => "Unicorn Rewards");
app.MapControllers();
app.Run();

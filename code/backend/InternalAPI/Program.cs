using InternalAPI.Models;
using InternalAPI.Services;
using Serilog;
using Serilog.Formatting.Json;
const string CORS_DEFAULT_POLICY = "DefaultCORSPolicy";
var builder = WebApplication.CreateBuilder(args);
{
    builder.Host.UseSerilog((ctx, lc) => lc.Enrich.FromLogContext().WriteTo.Console(formatter: new JsonFormatter(renderMessage: true)));

    builder.Services.Configure<TypicodeSettings>(builder.Configuration.GetSection(nameof(TypicodeSettings)));
    builder.Services.AddHttpClient<TypicodeClient>();
    builder.Services.AddCors(options =>
    {
        options.AddPolicy(CORS_DEFAULT_POLICY, configurePolicy =>
        {
            configurePolicy.WithOrigins("http://localhost", "https://localhost:7127")
            .AllowAnyHeader()
            .WithMethods("GET", "POST", "OPTIONS");

        });
    });
}
var app = builder.Build();
{
    // Configure the HTTP request pipeline.
    if (!app.Environment.IsDevelopment())
    {
        app.UseExceptionHandler("/Error");
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
    }
    app.UseCors(CORS_DEFAULT_POLICY);
    app.UseHttpsRedirection();
    app.MapGet("/", () => "Healthy");
    app.MapGet("/users", async (TypicodeClient client) => await client.GetUsersAsync());
    app.MapGet("/environment", () => Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT"));
}
app.Run();

using UnicornRewards.API.Services.Contracts;

namespace UnicornRewards.API.Services.Services
{
    public class BaseHttpClientService : IBaseHttpClientService
    {
        public HttpClient Client { get; set; }
        public BaseHttpClientService()
        {
            this.Client = new HttpClient();
            this.Client.BaseAddress = new Uri("https://jsonplaceholder.typicode.com/");
        }
    }
}

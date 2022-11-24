using Microsoft.AspNetCore.Mvc;

namespace UnicornRewards.API.Controllers
{
    [ApiController]
    [Route("[action]")]
    public class UserController : Controller
    {
        [HttpGet]
        public async Task<ActionResult> Users([FromRoute] string action)
        {
            HttpClient client = new HttpClient();

            client.BaseAddress = new Uri("https://jsonplaceholder.typicode.com");

            var response = await client.GetAsync(action);

            var jsonResponse = await response.Content.ReadAsStringAsync();

            return  Ok(jsonResponse);
        }
    }
}

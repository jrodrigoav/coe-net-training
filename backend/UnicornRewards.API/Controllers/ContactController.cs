using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;
using UnicornRewards.API.Services;

namespace UnicornRewards.API.Controllers
{
    [ApiController, Route("api/contact")]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService)
        {
            this._contactService = contactService;
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var response = await _contactService.AddContactAsync(id.ToString());
            return Ok(response);
        }

        [HttpPut("{name}")]
        public async Task<IActionResult> Put(string name)
        {
            var response = await _contactService.AddContactAsync(name);
            return Accepted();
        }

        [HttpPost]
        public async Task<IActionResult> getScvContent(IFormCollection collection)
        {
            var file = collection.Files["file"];
            var data = new List<string>();
            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                while (reader.EndOfStream == false)
                {
                    data.Add(reader.ReadLine() ?? string.Empty);
                }
            }

            var response = await _contactService.ReadCsvAsync(data);
            return Accepted(response);
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UnicornRewards.API.Services;

namespace UnicornRewards.API.Controllers
{
    [ApiController, Route("api/contact"), AllowAnonymous]
    public class ContactController : ControllerBase
    {
        private readonly IContactService<string> _contactService;

        public ContactController(IContactService<string> contactService)
        {
            this._contactService = contactService;
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var response = await _contactService.AddContact(id.ToString());
            return Ok(response);
        }

        [HttpPut("{name}")]
        public async Task<IActionResult> Put(string name)
        {
            var response = await _contactService.AddContact(name);
            return Accepted(response);
        }
    }
}

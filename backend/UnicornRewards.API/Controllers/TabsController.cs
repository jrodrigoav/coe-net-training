using Microsoft.AspNetCore.Mvc;
using UnicornRewards.API.Models;
using UnicornRewards.API.Models.Request;
using UnicornRewards.API.Services;

namespace UnicornRewards.API.Controllers
{
    [ApiController, Route("api/tabs")]
    public class TabsController : ControllerBase
    {
        private readonly IQuestionService _questionService;

        public TabsController(IQuestionService questionService)
        {
            _questionService = questionService;
        }

        [HttpGet]
        public async Task<ActionResult> GetList()
        {
            try
            {
                var response = await _questionService.GetTabsListAsync(x => x.Status);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(DtoTab model)
        {
            try
            {
                var response = await _questionService.CreateTabAsync(model);
                return Ok(response);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var response = await _questionService.DeleteTabAsync(id);
            return Ok(response);
        }
    }
}

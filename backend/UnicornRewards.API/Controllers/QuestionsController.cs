using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UnicornRewards.API.Models.Request;
using UnicornRewards.API.Services;

namespace UnicornRewards.API.Controllers
{
    [ApiController, Route("api/questions")]
    public class QuestionsController : ControllerBase
    {
        private readonly IQuestionService _questionService;

        public QuestionsController(IQuestionService questionService)
        {
            _questionService = questionService;
        }

        [HttpGet("{status}")]
        public async Task<IActionResult> GetQuestions(bool status)
        {
            var response = await _questionService.GetQuestionsAsync(x => x.Status == status);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Create(DtoQuestion dtoQuestion)
        {
            try
            {
                var response = await _questionService.CreateQuestionAsync(dtoQuestion);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
            
        }

        [HttpGet("{idQuestion:int}")]
        public async Task<IActionResult> GetAnswers(int idQuestion)
        {
            var response = await _questionService.GetSugestedAnswersAsync(idQuestion);

            return Ok(response);
        }
    }
}

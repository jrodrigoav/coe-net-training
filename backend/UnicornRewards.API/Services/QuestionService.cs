using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using UnicornRewards.API.Models;
using UnicornRewards.API.Models.Entities;
using UnicornRewards.API.Models.Request;

namespace UnicornRewards.API.Services
{
    public class QuestionService : IQuestionService
    {
        private readonly UnicornRewardsAPIContext _context;
        private readonly IMapper _mapper;

        public QuestionService(UnicornRewardsAPIContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> DeleteTabAsync(int id)
        {
            var entity = await _context.Set<Tab>()
                .AsTracking()
                .FirstOrDefaultAsync(x => x.Id == id);

            if (entity != null){
                entity.Status = false;
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<GenericResponse<ICollection<Tab>>> GetTabsListAsync(Expression<Func<Tab, bool>> expression)
        {
            var response = new GenericResponse<ICollection<Tab>>();

            var list = await _context.Set<Tab>()
                .Where(expression)
                .ToListAsync();

            response.Success = true;
            response.ResponseResult = list;

            return response;
        }

        public async Task<int> CreateTabAsync(DtoTab model)
        {
            var tab = _mapper.Map<Tab>(model);
            tab.Status = true;

            await _context.Set<Tab>().AddAsync(tab);
            await _context.SaveChangesAsync();

            return tab.Id;
        }

        public async Task<GenericResponse<ICollection<Question>>> GetQuestionsAsync(Expression<Func<Question, bool>> expression)
        {
            var response = new GenericResponse<ICollection<Question>>();

            var list = await _context.Set<Question>()
                .Where(expression)
                .ToListAsync();

            //foreach(var question in list)
            //{
            //    if (!string.IsNullOrEmpty(question.SugestedAnswers)) {
            //        question.ListAnswers = question.SugestedAnswers.Split('|').ToList();
            //    }
            //}

            response.Success=true;
            response.ResponseResult = list;

            return response;
        }

        public async Task<int> CreateQuestionAsync(DtoQuestion model)
        {
            var question = _mapper.Map<Question>(model);

            question.Status = true;
            var response = await _context.Set<Question>().AddAsync(question);
            _context.SaveChangesAsync();

            return question.Id;
        }

        public async Task<List<string>> GetSugestedAnswersAsync(int idQuestion)
        {
            var response = new List<string>();

            var answers = await _context.Set<Question>()
                .Where(x => x.Id == idQuestion)
                .Select(x => x.SugestedAnswers)
                .FirstOrDefaultAsync();

            string? strAnswer = answers;

            response = strAnswer?.Split('|').ToList();

            return response;
        }
    }
}

using AutoMapper;
using UnicornRewards.API.Models.Entities;
using UnicornRewards.API.Models.Request;

namespace UnicornRewards.API.Models
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<DtoUser, User>()
                .ForMember(m => m.Name, dto => dto.MapFrom(x => x.Name))
                .ForMember(m => m.UserName, dto => dto.MapFrom(x => x.UserName))
                .ForMember(m => m.Email, dto => dto.MapFrom(x => x.Email))
                .ForMember(m => m.WebSite, dto => dto.MapFrom(x => x.WebSite))
                .ReverseMap();

            CreateMap<DtoTab, Tab>()
                .ForMember(m => m.Name, dto => dto.MapFrom(x => x.Name))
                .ForMember(m => m.Label, dto => dto.MapFrom(x => x.Label))
                .ForMember(m => m.Status, dto => dto.MapFrom(x => x.Status))
                .ReverseMap();

            CreateMap<DtoQuestion, Question>()
                .ForMember(m => m.Type, dto => dto.MapFrom(x => x.Type))
                .ForMember(m => m.Label, dto => dto.MapFrom(x => x.Label))
                .ForMember(m => m.SugestedAnswers, dto => dto.MapFrom(x => x.SugestedAnswers))
                .ForMember(m => m.TabId, dto => dto.MapFrom(x => x.TabId))
                .ReverseMap();
        }
    }
}

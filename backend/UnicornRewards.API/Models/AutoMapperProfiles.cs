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
                .ForMember(dto => dto.Name, ent => ent.MapFrom(x => x.Name))
                .ForMember(dto => dto.UserName, ent => ent.MapFrom(x => x.UserName))
                .ForMember(dto => dto.Email, ent => ent.MapFrom(x => x.Email))
                .ForMember(dto => dto.WebSite, ent => ent.MapFrom(x => x.WebSite))
                .ReverseMap();
        }
    }
}

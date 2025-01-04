using AutoMapper;
using Login.DTOs;
using Login.Entities;

namespace Login.Mappings
{
    public class EntitiesToDTOMappingProfile : Profile
    {
        public EntitiesToDTOMappingProfile()
        {
            CreateMap<Costumer, AuthDTO>().ReverseMap();
        }
    }
}

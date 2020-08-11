using API.DTOs;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
  public class MappingProfiles : Profile
  {
    public MappingProfiles()
    {
      CreateMap<Goal, GoalReturnDTO>();
      CreateMap<GoalInputDTO, Goal>();
    }
  }
}
using System;
using API.DTOs.HelperDTOs;
using API.DTOs.InputDTOs;
using API.DTOs.ReturnDTOs;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
  public class MappingProfiles : Profile
  {
    public MappingProfiles()
    {
      //User mappings
      CreateMap<UserGoal, GoalReturnDTO>();
      CreateMap<GoalOrCompInputDTO, UserGoal>();
      CreateMap<User, UserReturnDTO>();
      CreateMap<User, DifferentUserReturnDTO>();
      CreateMap<RegisterOrUpdateInputDTO, User>();
      CreateMap<UserFriendRequest, UserFriendRequestReturnDTO>();

      //Competition mappings
      CreateMap<GoalOrCompInputDTO, CompetitionGoal>();
      CreateMap<CompetitionParticipant, CompetitionParticipantHelperDTO>().ForMember(d => d.Name, o => o.MapFrom(s => s.User.Name));
      CreateMap<CompetitionAdmin, Guid>().ConstructUsing(x => x.UserId);
      CreateMap<CompetitionGoal, CompetitionReturnDTO>().ForMember(d => d.Type, o => o.MapFrom(s => s.Type.ToString()));
      CreateMap<CompetitionLetter, LetterReturnDTO>().ForMember(d => d.Type, o => o.MapFrom(s => s.Type.ToString()));
    }
  }
}
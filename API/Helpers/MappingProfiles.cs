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
      //User
      CreateMap<RegisterOrUpdateInputDTO, User>();
      CreateMap<User, UserReturnDTO>();
      CreateMap<User, DifferentUserReturnDTO>();

      //Goal
      CreateMap<GoalInputDTO, UserGoal>();
      CreateMap<UserGoal, GoalReturnDTO>();

      //Friend

      //FriendRequest
      CreateMap<UserFriendRequest, UserFriendRequestReturnDTO>();

      //Competition
      CreateMap<CompInputDTO, CompetitionGoal>();

      //Participant
      CreateMap<CompetitionParticipant, CompetitionParticipantHelperDTO>().ForMember(d => d.Name, o => o.MapFrom(s => s.User.Name));

      //ParticipantRequet
      CreateMap<CompetitionParticipantRequest, ParticipantRequestReturnDTO>();

      //Admin
      CreateMap<CompetitionAdmin, Guid>().ConstructUsing(x => x.UserId);

      //AdminRequest
      CreateMap<CompetitionAdminRequest, AdminRequestDTO>();

    }
  }
}
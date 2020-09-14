using API.DTOs;
using API.DTOs.GoalDTOs;
using API.DTOs.UserDTOs;
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
      CreateMap<User, UserReturnDTO>();
      CreateMap<UpdateUserDTO, User>();
      CreateMap<UserFriendRequest, UserFriendRequestDTO>();
      CreateMap<UserFriendship, UserFriendshipDTO>();
    }
  }
}
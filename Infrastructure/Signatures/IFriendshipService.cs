using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Infrastructure.Models.Response;

namespace Infrastructure.Signatures
{
  public interface IFriendshipService
  {
    Task<IReadOnlyList<DifferentUserResponse>> GetFriends(Guid userId);
    Task<DifferentUserInfoResponse> GetDifferentUserInfo(Guid userId, Guid differentUserId);
    Task<DifferentUserInfoResponse> AddFriend(Guid userId, Guid differentUserId);
    Task DeleteFriend(Guid userId, Guid differentUserId);
  }
}
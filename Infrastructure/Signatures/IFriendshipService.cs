using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Infrastructure.Models.Response;

namespace Infrastructure.Signatures
{
  public interface IFriendshipService
  {
    Task<OtherUserInfoResponse> GetOtherUserInfo(Guid userId, Guid friendId);
    Task<IReadOnlyList<DifferentUserResponse>> GetFriends(Guid userId);
    Task<OtherUserInfoResponse> AddFriend(Guid userId, Guid friendId);
    Task DeleteFriend(Guid userId, Guid friendId);
  }
}
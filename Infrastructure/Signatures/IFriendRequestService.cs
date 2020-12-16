using System;
using System.Threading.Tasks;
using Infrastructure.Models.Response;

namespace Infrastructure.Signatures
{
  public interface IFriendRequestService
  {
    Task<FriendRequestUserInfoResponse> GetFriendRequestUserInfo(Guid userId);
    Task<UsersWhoSentFriendRequestResponse> GetUsersWhoSentFriendRequest(Guid userId);
    Task AddFriendRequest(Guid userId, Guid friendId);
    Task RejectOrDeleteFriendRequest(Guid userId, Guid friendId);
  }
}
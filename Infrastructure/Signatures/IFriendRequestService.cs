using System;
using System.Threading.Tasks;
using Infrastructure.Models.Response;

namespace Infrastructure.Signatures
{
  public interface IFriendRequestService
  {
    Task<FriendRequestInfoResponse> GetUserFriendRequestInfo(Guid userId);
    Task AddFriendRequest(Guid userId, Guid differentUserId);
    Task DeleteFriendRequest(Guid userId, Guid differentUserId);
  }
}
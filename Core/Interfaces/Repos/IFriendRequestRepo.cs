using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entity;

namespace Core.Interfaces.Repos
{
  public interface IFriendRequestRepo : IBaseRepo
  {
    Task<FriendRequest> GetFriendRequest(Guid userId, Guid friendId);
    Task<IEnumerable<FriendRequest>> GetFriendRequestsWithUsers(Guid userId);
    Task<IEnumerable<User>> GetUsersWhoSentFriendRequest(Guid userId);
    void AddFriendRequest(FriendRequest friendRequest);
    void DeleteFriendRequest(FriendRequest friendRequest);
  }
}
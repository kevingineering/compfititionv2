using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entity;

namespace Core.Interfaces.Repos
{
  public interface IFriendRequestRepo : IBaseRepo
  {
    Task<FriendRequest> Get(Guid userId, Guid differentUserId);
    Task<IEnumerable<FriendRequest>> GetUsersWithFriendRequests(Guid userId);
    void Create(FriendRequest friendRequest);
    void Delete(FriendRequest friendRequest);
  }
}
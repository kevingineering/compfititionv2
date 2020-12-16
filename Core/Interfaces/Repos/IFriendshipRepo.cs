using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entity;

namespace Core.Interfaces.Repos
{
  public interface IFriendshipRepo : IBaseRepo
  {
    Task<User> GetFriend(Guid userId, Guid friendId);
    Task<Friendship> GetFriendship(Guid userId, Guid friendId);
    Task<User> GetOtherUserInfo(Guid friendId);
    Task<IEnumerable<User>> GetFriends(Guid userId);
    void AddFriendship(Friendship friendship);
    void DeleteFriendship(Friendship friendship);
  }
}
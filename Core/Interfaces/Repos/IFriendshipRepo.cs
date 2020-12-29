using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entity;

namespace Core.Interfaces.Repos
{
  public interface IFriendshipRepo : IBaseRepo
  {
    Task<Friendship> Get(Guid userId, Guid differentUserId);
    Task<IEnumerable<User>> GetList(Guid userId);
    Task<User> GetDifferentUserInfo(Guid differentUserId);
    void Create(Friendship friendship);
    void Delete(Friendship friendship);
  }
}
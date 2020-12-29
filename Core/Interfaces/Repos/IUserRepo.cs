using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entity;

namespace Core.Interfaces.Repos
{
  public interface IUserRepo : IBaseRepo
  {
    Task<User> Get(Guid userId);
    Task<User> Get(string email);
    Task<User> GetUserInfo(Guid userId);
    Task<IEnumerable<User>> GetSearchableUsers(Guid userId);
    void Create(User user);
    void Update(User user);
    void Delete(User user);
  }
}
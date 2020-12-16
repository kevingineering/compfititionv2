using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entity;

namespace Core.Interfaces.Repos
{
  public interface IUserRepo : IBaseRepo
  {
    Task<User> GetUser(Guid userId);
    Task<User> GetUserByEmail(string email);
    Task<IEnumerable<User>> GetSearchableUsers(Guid userId);
    void CreateUser(User user);
    void UpdateUser(User user);
    void DeleteUser(User user);
  }
}
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
  public interface IUserService
  {
    //CREATE
    Task<User> RegisterUserAsync(User user);

    //READ
    Task<User> GetUserById(Guid userid);
    Task<User> GetUserByEmail(string email);
    Task<IReadOnlyList<User>> GetUsersInArray(Guid[] userids);
    Task<IReadOnlyList<User>> GetSearchableUsers();

    //UPDATE
    Task<User> UpdateUser(User user);

    //DELETE
    Task<bool> DeleteUser(Guid userid);
  }
}
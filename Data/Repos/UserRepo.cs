using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entity;
using Core.Interfaces.Repos;
using Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Data.Repos
{
  public class UserRepo : BaseRepo, IUserRepo
  {

    public UserRepo(DataContext context) : base(context)
    {
    }

    public async Task<User> GetUser(Guid userId)
    {
      return await _context.Users
        .FirstOrDefaultAsync(x => x.UserId == userId);
    }

    public async Task<User> GetUserByEmail(string email)
    {
      //allowing user to return as null for Register
      return await _context.Users
        .FirstOrDefaultAsync(x => x.Email == email);
    }

    public async Task<User> GetUserWithGoals(Guid userId, Guid friendId)
    {
      var user = await _context.Users
        .Include(x => x.Goals)
        .FirstOrDefaultAsync(x => (x.UserId == userId));

      return user;
    }

    public async Task<IEnumerable<User>> GetSearchableUsers(Guid userId)
    {
      return await _context.Users.Where(x => x.IsSearchable && x.UserId != userId).ToListAsync();
    }

    public void CreateUser(User user)
    {
      _context.Users.Add(user);
    }

    public void UpdateUser(User user)
    {
      _context.Users.Attach(user);
      _context.Entry(user).State = EntityState.Modified;
    }

    public void DeleteUser(User user)
    {
      _context.Users.Remove(user);
    }
  }
}
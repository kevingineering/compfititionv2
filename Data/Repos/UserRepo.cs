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

    public async Task<User> Get(Guid userId)
    {
      return await _context.Users
        .FirstOrDefaultAsync(x => x.UserId == userId);
    }

    public async Task<User> Get(string email)
    {
      //allowing user to return as null for Register
      return await _context.Users
        .FirstOrDefaultAsync(x => x.Email == email);
    }

    public async Task<User> GetUserInfo(Guid userId)
    {
      return await _context.Users
        .Include(x => x.Goals)
          .ThenInclude(x => x.Challenge)
        .Include(x => x.Participations)
          .ThenInclude(x => x.Competition)
            .ThenInclude(x => x.Challenge)
        .Include(x => x.User1Friends)
          .ThenInclude(x => x.User2)
        .Include(x => x.User2Friends)
          .ThenInclude(x => x.User1)
        .Include(x => x.Receivers)
          .ThenInclude(x => x.Sender)
        .FirstOrDefaultAsync(x => x.UserId == userId);
    }

    public async Task<IEnumerable<User>> GetSearchableUsers(Guid userId)
    {
      return await _context.Users
        .Where(x => x.IsSearchable && x.UserId != userId)
        .ToListAsync();
    }

    public void Create(User user)
    {
      _context.Users.Add(user);
    }

    public void Update(User user)
    {
      _context.Users.Attach(user);
      _context.Entry(user).State = EntityState.Modified;
    }

    public void Delete(User user)
    {
      _context.Users.Remove(user);
    }
  }
}
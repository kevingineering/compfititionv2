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
  public class FriendshipRepo : BaseRepo, IFriendshipRepo
  {
    public FriendshipRepo(DataContext context) : base(context)
    {

    }

    public async Task<Friendship> Get(Guid userId, Guid differentUserId)
    {
      return await _context.Friendships
        .FirstOrDefaultAsync(x =>
          (x.User1Id == userId && x.User2Id == differentUserId) ||
          (x.User1Id == differentUserId && x.User2Id == userId));
    }

    public async Task<IEnumerable<User>> GetList(Guid userId)
    {
      return await _context.Friendships
        .Where(x => x.User1Id == userId || x.User2Id == userId)
        .Include(x => x.User1)
        .Include(x => x.User2)
        .Select(x => userId == x.User1Id ? x.User2 : x.User1)
        .ToListAsync();
    }

    public async Task<User> GetDifferentUserInfo(Guid differentUserId)
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
        .FirstOrDefaultAsync(x => x.UserId == differentUserId);
    }

    public void Create(Friendship friendship)
    {
      _context.Friendships.Add(friendship);
    }

    public void Delete(Friendship friendship)
    {
      _context.Friendships.Remove(friendship);
    }
  }
}
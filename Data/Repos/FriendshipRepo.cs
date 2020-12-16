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

    public async Task<Friendship> GetFriendship(Guid userId, Guid friendId)
    {
      return await _context.Friendships
        .FirstOrDefaultAsync(x =>
          (x.User1Id == userId && x.User2Id == friendId) ||
          (x.User1Id == friendId && x.User2Id == userId));
    }

    public async Task<User> GetFriend(Guid userId, Guid friendId)
    {
      var friendship = await _context.Friendships
        .Include(x => x.User1)
        .Include(x => x.User2)
        .FirstOrDefaultAsync(x =>
          (x.User1Id == userId && x.User2Id == friendId) ||
          (x.User1Id == friendId && x.User2Id == userId));

      return friendship == null
        ? null
        : friendship.User1Id == userId
          ? friendship.User2
          : friendship.User1;
    }

    public async Task<User> GetOtherUserInfo(Guid friendId)
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
        .FirstOrDefaultAsync(x => x.UserId == friendId);
    }

    public async Task<IEnumerable<User>> GetFriends(Guid userId)
    {
      return await _context.Friendships
        .Where(x => x.User1Id == userId || x.User2Id == userId)
        .Include(x => x.User1)
        .Include(x => x.User2)
        .Select(x => userId == x.User1Id ? x.User2 : x.User1)
        .ToListAsync();
    }

    public void AddFriendship(Friendship friendship)
    {
      _context.Friendships.Add(friendship);
    }

    public void DeleteFriendship(Friendship friendship)
    {
      _context.Friendships.Remove(friendship);
    }
  }
}
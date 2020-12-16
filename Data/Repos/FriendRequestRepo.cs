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
  public class FriendRequestRepo : BaseRepo, IFriendRequestRepo
  {
    public FriendRequestRepo(DataContext context) : base(context)
    {

    }

    public async Task<FriendRequest> GetFriendRequest(Guid userId, Guid friendId)
    {
      return await _context.FriendRequests
        .FirstOrDefaultAsync(x =>
            (x.SenderId == userId && x.ReceiverId == friendId) ||
            (x.ReceiverId == userId && x.SenderId == friendId)
        );
    }

    public async Task<IEnumerable<User>> GetUsersWhoSentFriendRequest(Guid userId)
    {
      return await _context.FriendRequests
        .Where(x => x.ReceiverId == userId)
        .Select(x => x.Sender)
        .ToListAsync();
    }

    public async Task<IEnumerable<FriendRequest>> GetFriendRequestsWithUsers(Guid userId)
    {
      return await _context.FriendRequests
        .Where(x => x.ReceiverId == userId || x.SenderId == userId)
        .Include(x => x.Receiver)
        .Include(x => x.Sender)
        .ToListAsync();
    }

    public void AddFriendRequest(FriendRequest friendRequest)
    {
      _context.FriendRequests.Add(friendRequest);
    }

    public void DeleteFriendRequest(FriendRequest friendRequest)
    {
      _context.FriendRequests.Remove(friendRequest);
    }
  }
}
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

    public async Task<FriendRequest> Get(Guid userId, Guid differentUserId)
    {
      return await _context.FriendRequests
        .FirstOrDefaultAsync(x =>
            (x.SenderId == userId && x.ReceiverId == differentUserId) ||
            (x.ReceiverId == userId && x.SenderId == differentUserId)
        );
    }

    public async Task<IEnumerable<FriendRequest>> GetUsersWithFriendRequests(Guid userId)
    {
      return await _context.FriendRequests
        .Where(x => x.ReceiverId == userId || x.SenderId == userId)
        .Include(x => x.Receiver)
        .Include(x => x.Sender)
        .ToListAsync();
    }

    public void Create(FriendRequest friendRequest)
    {
      _context.FriendRequests.Add(friendRequest);
    }

    public void Delete(FriendRequest friendRequest)
    {
      _context.FriendRequests.Remove(friendRequest);
    }
  }
}
using System;
using Core.Entities;

namespace Core.Specifications.FriendRequests
{
  public class FriendRequestSpec : BaseSpecification<UserFriendRequest>
  {
    public FriendRequestSpec(Guid userId, Guid friendId) : base(x => (x.SenderId == userId && x.ReceiverId == friendId) || (x.ReceiverId == userId && x.SenderId == friendId))
    {

    }
  }
}
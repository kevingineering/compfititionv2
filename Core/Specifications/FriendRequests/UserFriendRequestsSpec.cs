using System;
using Core.Entities;

namespace Core.Specifications.FriendRequests
{
  public class UserFriendRequestsSpec : BaseSpecification<UserFriendRequest>
  {
    public UserFriendRequestsSpec(Guid id) : base(x => x.SenderId == id || x.ReceiverId == id)
    {
      AddInclude(x => x.Receiver);
      AddInclude(x => x.Sender);
    }
  }
}
using System;
using Core.Entities;

namespace Core.Specifications.Friends
{
  public class ReceivedRequestsSpec : BaseSpecification<UserFriendRequest>
  {
    public ReceivedRequestsSpec(Guid id) : base(x => x.ReceiverId == id)
    {

    }
  }
}
using System;
using Core.Entities;

namespace Core.Specifications.Friends
{
  public class SentRequestsSpec : BaseSpecification<UserFriendRequest>
  {
    public SentRequestsSpec(Guid id) : base(x => x.SenderId == id)
    {

    }
  }
}
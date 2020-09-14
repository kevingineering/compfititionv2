using System;
using Core.Entities;

namespace Core.Specifications.Friends
{
  public class RequestsWithBothIdsSpec : BaseSpecification<UserFriendRequest>
  {
    public RequestsWithBothIdsSpec(Guid userId, Guid friendId) : base(x => (x.RequesterId == userId && x.RequesteeId == friendId) || (x.RequesteeId == userId && x.RequesterId == friendId))
    {

    }
  }
}
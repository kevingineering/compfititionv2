using System;
using Core.Entities;

namespace Core.Specifications.Friends
{
  public class RequestsWithBothIdsSpec : BaseSpecification<UserFriendRequest>
  {
    public RequestsWithBothIdsSpec(Guid userId, Guid friendId) : base(x => (x.SenderId == userId && x.ReceiverId == friendId) || (x.ReceiverId == userId && x.SenderId == friendId))
    {

    }
  }
}
using System;
using Core.Entities;

namespace Core.Specifications.Friends
{
  public class FriendshipWithBothIdsSpec : BaseSpecification<UserFriendship>
  {
    public FriendshipWithBothIdsSpec(Guid userId, Guid friendId) : base(x => (x.User1Id == userId && x.User2Id == friendId) || (x.User2Id == userId && x.User1Id == friendId))
    {

    }
  }
}
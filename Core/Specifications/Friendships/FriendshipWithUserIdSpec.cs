using System;
using Core.Entities;

namespace Core.Specifications.Friendships
{
  public class FriendshipWithUserIdSpec
   : BaseSpecification<UserFriendship>
  {
    public FriendshipWithUserIdSpec(Guid id) : base(x => x.User1Id == id || x.User2Id == id)
    {
      AddInclude(x => x.User1);
      AddInclude(x => x.User2);
    }
  }
}
using System;
using Core.Entities;

namespace Core.Specifications.Friends
{
  public class FriendshipWithUserIdSpec
   : BaseSpecification<UserFriendship>
  {
    public FriendshipWithUserIdSpec(Guid id) : base(x => x.User1Id == id || x.User2Id == id)
    {

    }
  }
}
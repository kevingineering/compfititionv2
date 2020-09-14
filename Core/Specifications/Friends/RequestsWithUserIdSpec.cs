using System;
using Core.Entities;

namespace Core.Specifications.Friends
{
  public class RequestsWithUserIdSpec : BaseSpecification<UserFriendRequest>
  {
    public RequestsWithUserIdSpec(Guid id) : base(x => x.RequesterId == id || x.RequesteeId == id)
    {

    }
  }
}
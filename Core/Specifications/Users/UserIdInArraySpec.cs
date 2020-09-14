using System;
using System.Collections.Generic;
using System.Linq;
using Core.Entities;

namespace Core.Specifications.Users
{
  public class UserIdInArraySpec : BaseSpecification<User>
  {
    public UserIdInArraySpec(IReadOnlyList<Guid> userIds) : base(x => userIds.Contains(x.Id))
    {

    }
  }
}
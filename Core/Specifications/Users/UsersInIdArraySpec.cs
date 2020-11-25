using System;
using System.Collections.Generic;
using System.Linq;
using Core.Entities;

namespace Core.Specifications.Users
{
  public class UsersInIdArraySpec : BaseSpecification<User>
  {
    public UsersInIdArraySpec(IReadOnlyList<Guid> userIds) : base(x => userIds.Contains(x.Id))
    {
      AddOrderBy(x => x.Name);
    }
  }
}
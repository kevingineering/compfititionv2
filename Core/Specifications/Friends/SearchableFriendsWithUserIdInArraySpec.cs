using System;
using System.Collections.Generic;
using System.Linq;
using Core.Entities;

namespace Core.Specifications.Friends
{
  public class SearchableFriendsWithUserIdInArraySpec
   : BaseSpecification<User>
  {
    public SearchableFriendsWithUserIdInArraySpec(IEnumerable<Guid> array) : base(x => x.IsSearchable && array.Contains(x.Id))
    {

    }
  }
}
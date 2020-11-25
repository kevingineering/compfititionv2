using System;
using Core.Entities;

namespace Core.Specifications.Users
{
  public class SearchableUserSpec : BaseSpecification<User>
  {
    //filters our requesting user
    public SearchableUserSpec(Guid id) : base(x => x.IsSearchable && x.Id != id)
    {

    }
  }
}
using System;
using Core.Entities;

namespace Core.Specifications.Goals
{
  public class GoalsWithUserIdSpec : BaseSpecification<Goal>
  {
    public GoalsWithUserIdSpec(Guid id) : base(x => x.UserId == id)
    {

    }
  }
}
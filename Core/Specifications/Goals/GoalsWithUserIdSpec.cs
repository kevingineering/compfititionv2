using System;
using Core.Entities;

namespace Core.Specifications.Goals
{
  public class GoalsWithUserIdSpec : BaseSpecification<UserGoal>
  {
    public GoalsWithUserIdSpec(Guid id) : base(x => x.UserId == id)
    {
      AddOrderBy(x => x.StartDate);
    }
  }
}
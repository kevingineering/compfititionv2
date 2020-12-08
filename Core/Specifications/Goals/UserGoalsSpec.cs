using System;
using Core.Entities;

namespace Core.Specifications.Goals
{
  public class UserGoalsSpec : BaseSpecification<UserGoal>
  {
    public UserGoalsSpec(Guid id) : base(x => x.UserId == id)
    {
      AddOrderBy(x => x.StartTime);
    }
  }
}
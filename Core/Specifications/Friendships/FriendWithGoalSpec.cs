using System;
using Core.Entities;

namespace Core.Specifications.Friendships
{
  public class FriendWithGoalSpec : BaseSpecification<User>
  {
    public FriendWithGoalSpec(Guid id) : base(x => x.Id == id)
    {
      AddInclude(x => x.UserGoals);
    }
  }
}
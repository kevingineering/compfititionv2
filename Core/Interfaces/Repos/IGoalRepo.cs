using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entity;

namespace Core.Interfaces.Repos
{
  public interface IGoalRepo : IBaseRepo
  {
    Task<Goal> GetGoal(Guid goalId);
    Task<IEnumerable<Goal>> GetUserGoals(Guid userId);
    void AddGoal(Goal goal);
    void UpdateGoal(Goal goal);
    void DeleteGoal(Goal goal);
  }
}
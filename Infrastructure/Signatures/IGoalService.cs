using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Infrastructure.Models.Request;
using Infrastructure.Models.Response;

namespace Infrastructure.Signatures
{
  public interface IGoalService
  {
    Task<GoalResponse> GetGoal(Guid userId, Guid goalId);

    Task<IReadOnlyList<GoalResponse>> GetUserGoals(Guid userId);

    Task<GoalResponse> AddGoal(Guid userId, GoalRequest request);

    Task<GoalResponse> UpdateGoal(Guid userId, Guid goalId, GoalRequest request);

    Task<GoalResponse> UpdateGoalLedger(Guid userId, LedgerRequest request);

    Task DeleteGoal(Guid userId, Guid goalId);
  }
}
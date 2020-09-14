using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
  public interface IGoalService
  {
    //CREATE 
    Task<Goal> CreateGoalAsync(Goal goal);

    //READ
    Task<Goal> GetGoalAsync(Guid goalId);
    Task<IReadOnlyList<Goal>> GetGoalsByUserIdAsync(Guid userId);
    // Task<IReadOnlyList<Goal>> GetGoalsByCompId(Guid compId);
    // Task<IReadOnlyList<Goal>> GetFriendGoals(Guid friendId);
    // Task<Goal> GetCompTemplateGoal(Guid compId); //TODO - do I need this?

    //UPDATE
    Task<Goal> UpdateGoalAsync(Goal goal);
    //void UpdatedCompIdToNull(Guid compId); - when competition deleted
    //void UpdateCompIdToNullForOneUser(Guid compId, Guid userId); - when user leaves competition
    //update goals by user id
    //update goals by comp id
    //update goals by user id and append tracker
    //update goals by comp id and append tracker
    //update goals by user id and trim tracker
    //update goals by comp id and trim tracker
    //update compid on goal to null by user id

    //DELETE
    Task<bool> DeleteGoalAsync(Goal goal);
    // void DeleteCompTemplateGoal(Guid compId);
    // void DeleteAllUserGoals(Guid userId);
  }
}
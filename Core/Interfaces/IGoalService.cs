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
    Task<Goal> GetGoalAsync(Guid id);
    Task<IReadOnlyList<Goal>> GetGoalsByUserIdAsync(Guid id);
    Task<IReadOnlyList<Goal>> GetAllGoalsAsync(); //TODO - delete this option

    //UPDATE
    Task<Goal> UpdateGoalAsync(Goal goal);
    //void UpdatedCompIdToNull
    //void UpdateCompIdToNullForOneUser
    //update goals by user id
    //update goals by comp id
    //update goals by user id and append tracker
    //update goals by comp id and append tracker
    //update goals by user id and trim tracker
    //update goals by comp id and trim tracker
    //update compid on goal to null by user id

    //DELETE
    Task<bool> DeleteGoalAsync(Goal goal);
    // void DeleteCompTemplateGoal(Guid compid);
    // void DeleteAllUserGoals(Guid userid);
  }
}
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
  public interface ICompetitionService : IAbstractService<CompetitionGoal>
  {
    Task<bool> AddCompetitionAsync(CompetitionGoal comp, Guid userId);
    Task<IReadOnlyList<UserGoal>> GetUserCompetitionGoals(Guid userId);
    Task<IReadOnlyList<UserGoal>> GetFriendPublicCompetitionGoals(Guid userId);

    //TODO 

    /*
    Get competition
      get competition by id

    Get competition goals
      get goals by comp id

    Get competition participants
      get competition by id
      get users in array

    Get competition invitees
      get letters by comp id
      get users in array

    Create competition by goal id
      get goal by id
      add new competition
      update goal by id
      add new goal

    Delete competition
      get competition by id
      get goals by user id
      delete competition by id
      delete goal by user id
      updated compid on goals
      delete all competition letters
      add comp deleted letters

    Update competition

    Add user to competition

    Remove user from competition

    Kick user from competition

    Add admin to competition

    Remove admin from competition

    Get competition current goal
    */
  }
}
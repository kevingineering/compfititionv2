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
  }
}
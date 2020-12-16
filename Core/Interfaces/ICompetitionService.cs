using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entity;

namespace Core.Interfaces
{
  public interface ICompetitionService
  {
    Task<bool> AddCompetitionAsync(Competition competition, Guid userId);
    Task<IReadOnlyList<Goal>> GetUserCompetitions(Guid userId);
    Task<IReadOnlyList<Goal>> GetFriendPublicCompetitions(Guid userId);
  }
}
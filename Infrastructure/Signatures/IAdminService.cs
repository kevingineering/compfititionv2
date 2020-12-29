using System;
using System.Threading.Tasks;
using Infrastructure.Models.Response;

namespace Infrastructure.Signatures
{
  public interface IAdminService
  {
    Task<CompetitionResponse> AddAdminToCompetition(Guid userId, Guid competitionId);
    Task<CompetitionResponse> RemoveAdminFromCompetition(Guid userId, Guid competitionId);
  }
}
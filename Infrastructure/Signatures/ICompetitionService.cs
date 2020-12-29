using System;
using System.Threading.Tasks;
using Infrastructure.Models.Request;
using Infrastructure.Models.Response;

namespace Infrastructure.Signatures
{
  public interface ICompetitionService
  {
    Task<CompetitionResponse> GetCompetition(Guid userId, Guid competitionId);
    Task<CompetitionResponse> AddCompetition(Guid userId, CompetitionRequest request);
    Task<CompetitionResponse> UpdateCompetition(Guid competitionId, CompetitionRequest request);
    Task DeleteCompetition(Guid competitionId);
  }
}
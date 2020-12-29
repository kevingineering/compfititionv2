using System;
using System.Threading.Tasks;
using Infrastructure.Models.Response;

namespace Infrastructure.Signatures
{
  public interface IParticipationRequestService
  {
    Task<CompetitionUserResponse> AddParticipationRequest(Guid userId, Guid competitionId);
    Task DeleteParticipationRequest(Guid userId, Guid competitionId);
  }
}
using System;
using System.Threading.Tasks;
using Infrastructure.Models.Request;
using Infrastructure.Models.Response;

namespace Infrastructure.Signatures
{
  public interface IParticipantService
  {
    Task<ParticipantResponse> AddParticipantToCompetitionAsUser(Guid userId, Guid competitionId);
    Task<ParticipantResponse> AddParticipantToCompetitionAsAdmin(Guid differentUserId, Guid competitionId);
    Task<ParticipantResponse> UpdateParticipantLedger(Guid userId, LedgerRequest request);
    Task<ParticipantResponse> UpdateParticipantTarget(Guid userId, UpdateParticipantRequest request);
    Task<ParticipantResponse> UpdateParticipantInitialValue(Guid userId, UpdateParticipantRequest request);
    Task RemoveUserFromCompetition(Guid userId, Guid competitionId);
    Task KickUserFromCompetition(Guid differentUserId, Guid competitionId);
  }
}
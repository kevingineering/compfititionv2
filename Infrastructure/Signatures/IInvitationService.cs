using System;
using System.Threading.Tasks;
using Infrastructure.Models.Response;

namespace Infrastructure.Signatures
{
  public interface IInvitationService
  {
    Task<CompetitionUserResponse> AddInvite(Guid differentUserId, Guid competitionId);
    Task DeleteInvite(Guid userId, Guid competitionId);
  }
}
using System;
using System.Threading.Tasks;
using Core.Entity;
using Core.Interfaces.Repos;
using Infrastructure.Models.Response;
using Infrastructure.Signatures;

namespace Infrastructure.Services
{
  public class InvitationService : IInvitationService
  {
    private readonly IInvitationRepo _invitationRepo;
    private readonly IParticipantRepo _participantRepo;
    private readonly IUserRepo _userRepo;

    public InvitationService(IInvitationRepo invitationRepo, IParticipantRepo participantRepo, IUserRepo userRepo)
    {
      _invitationRepo = invitationRepo;
      _participantRepo = participantRepo;
      _userRepo = userRepo;
    }

    public async Task<CompetitionUserResponse> AddInvite(Guid differentUserId, Guid competitionId)
    {
      var existingInvitation = await _invitationRepo.Get(differentUserId, competitionId);
      existingInvitation.EnsureDoesNotExist();

      var participant = await _participantRepo.Get(differentUserId, competitionId);
      participant.EnsureDoesNotExist("User is already in competition.");

      var user = await _userRepo.Get(differentUserId);
      user.EnsureExists("User not found.");

      var invitation = new Invitation(differentUserId, competitionId);
      _invitationRepo.Create(invitation);
      await _invitationRepo.Save();

      return new CompetitionUserResponse(user);
    }

    public async Task DeleteInvite(Guid userId, Guid competitionId)
    {
      var invitation = await _invitationRepo.Get(userId, competitionId);
      invitation.EnsureExists("Invitation not found.");

      _invitationRepo.Delete(invitation);
      await _invitationRepo.Save();
    }
  }
}
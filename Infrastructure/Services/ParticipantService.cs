using System;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entity;
using Core.Errors;
using Core.Interfaces.Repos;
using Infrastructure.Models.Request;
using Infrastructure.Models.Response;
using Infrastructure.Signatures;

namespace Infrastructure.Services
{
  public class ParticipantService : IParticipantService
  {
    private readonly IParticipantRepo _participantRepo;
    private readonly IInvitationRepo _invitationRepo;
    private readonly IParticipationRequestRepo _participationRequestRepo;
    private readonly IAdminRepo _adminRepo;

    public ParticipantService(IParticipantRepo participantRepo, IInvitationRepo invitationRepo, IParticipationRequestRepo participationRequestRepo, IAdminRepo adminRepo)
    {
      _participantRepo = participantRepo;
      _invitationRepo = invitationRepo;
      _participationRequestRepo = participationRequestRepo;
      _adminRepo = adminRepo;
    }

    public async Task<ParticipantResponse> AddParticipantToCompetitionAsUser(Guid userId, Guid competitionId)
    {
      var invitation = await _invitationRepo.Get(userId, competitionId);
      invitation.EnsureExists("User has not been invited to join competition.");

      var participant = new Participant(userId, competitionId);
      _invitationRepo.Delete(invitation);
      _participantRepo.Create(participant);
      await _participantRepo.Save();

      return new ParticipantResponse(participant);
    }

    public async Task<ParticipantResponse> AddParticipantToCompetitionAsAdmin(Guid differentUserId, Guid competitionId)
    {
      var participationRequest = await _participationRequestRepo.Get(differentUserId, competitionId);
      participationRequest.EnsureExists("Participation request not found.");

      var participant = new Participant(differentUserId, competitionId);
      _participationRequestRepo.Delete(participationRequest);
      _participantRepo.Create(participant);
      await _participantRepo.Save();

      return new ParticipantResponse(participant);
    }

    public async Task<ParticipantResponse> UpdateParticipantInitialValue(Guid userId, UpdateParticipantRequest request)
    {
      var participant = await _participantRepo.Get(userId, request.CompetitionId);
      participant.EnsureExists("Participant not found.");

      participant.InitialValue = request.Value;
      _participantRepo.Update(participant);
      await _participantRepo.Save();

      return new ParticipantResponse(participant);
    }

    public async Task<ParticipantResponse> UpdateParticipantLedger(Guid userId, LedgerRequest request)
    {
      var participant = await _participantRepo.Get(userId, request.GoalId);
      participant.EnsureExists("User not in competition.");

      //verify ledger is of correct type
      foreach (var item in request.Ledger)
      {
        if (item != null && item.GetType() != typeof(Decimal))
        {
          throw new ApiError(400, "Invalid inputs.");
        }
      }

      participant.Ledger = JsonSerializer.Serialize(request.Ledger);
      _participantRepo.Update(participant);
      await _participantRepo.Save();

      return new ParticipantResponse(participant);
    }

    public async Task<ParticipantResponse> UpdateParticipantTarget(Guid userId, UpdateParticipantRequest request)
    {
      var participant = await _participantRepo.Get(userId, request.CompetitionId);
      participant.EnsureExists("User not in competition.");

      participant.Target = request.Value;
      _participantRepo.Update(participant);
      await _participantRepo.Save();

      return new ParticipantResponse(participant);
    }

    public async Task KickUserFromCompetition(Guid differentUserId, Guid competitionId)
    {
      var participant = await _participantRepo.Get(differentUserId, competitionId);
      participant.EnsureExists("User is not in competition.");

      var admin = await _adminRepo.Get(differentUserId, competitionId);
      admin.EnsureDoesNotExist("You cannot kick an admin from a competition.");

      _participantRepo.Delete(participant);
      await _participantRepo.Save();
    }

    public async Task RemoveUserFromCompetition(Guid userId, Guid competitionId)
    {
      var participant = await _participantRepo.Get(userId, competitionId);
      participant.EnsureExists("User is not in competition.");

      var admin = await _adminRepo.Get(userId, competitionId);
      admin.EnsureDoesNotExist("You are an admin for this competition. You cannot leave this competition without first relinquishing your responsibilities.");

      _participantRepo.Delete(participant);
      await _participantRepo.Save();
    }
  }
}
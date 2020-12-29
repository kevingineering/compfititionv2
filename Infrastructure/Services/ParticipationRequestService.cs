using System;
using System.Threading.Tasks;
using Core.Entity;
using Core.Interfaces.Repos;
using Infrastructure.Models.Response;
using Infrastructure.Signatures;

namespace Infrastructure.Services
{
  public class ParticipationRequestService : IParticipationRequestService
  {
    private readonly IParticipationRequestRepo _participationRequestRepo;
    private readonly IParticipantRepo _participantRepo;
    private readonly ICompetitionRepo _competitionRepo;
    private readonly IUserRepo _userRepo;

    public ParticipationRequestService(IParticipationRequestRepo participationRequestRepo, IParticipantRepo participantRepo, ICompetitionRepo competitionRepo, IUserRepo userRepo)
    {
      _participationRequestRepo = participationRequestRepo;
      _participantRepo = participantRepo;
      _competitionRepo = competitionRepo;
      _userRepo = userRepo;
    }

    public async Task<CompetitionUserResponse> AddParticipationRequest(Guid userId, Guid competitionId)
    {
      var competition = await _competitionRepo.Get(competitionId);
      competition.EnsureExists("Competition not found.");

      var existingParticipationRequest = await _participationRequestRepo.Get(userId, competitionId);
      existingParticipationRequest.EnsureDoesNotExist();

      var existingParticipant = await _participantRepo.Get(userId, competitionId);
      existingParticipant.EnsureDoesNotExist();

      var user = await _userRepo.Get(userId);
      user.EnsureExists("User not found.");

      var participationRequest = new ParticipationRequest(userId, competitionId);
      _participationRequestRepo.Create(participationRequest);
      await _participationRequestRepo.Save();

      return new CompetitionUserResponse(user);
    }

    public async Task DeleteParticipationRequest(Guid userId, Guid competitionId)
    {
      var participationRequest = await _participationRequestRepo.Get(userId, competitionId);
      participationRequest.EnsureExists("Participant request not found.");

      _participationRequestRepo.Delete(participationRequest);
      await _participationRequestRepo.Save();
    }
  }
}
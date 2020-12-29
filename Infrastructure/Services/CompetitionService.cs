using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entity;
using Core.Errors;
using Core.Interfaces.Repos;
using Infrastructure.Models.Request;
using Infrastructure.Models.Response;
using Infrastructure.Signatures;

namespace Infrastructure.Services
{
  public class CompetitionService : ICompetitionService
  {
    private readonly ICompetitionRepo _competitionRepo;
    private readonly IChallengeRepo _challengeRepo;
    private readonly IMappingService _mappingService;
    private readonly IAdminRepo _adminRepo;
    private readonly IParticipantRepo _participantRepo;

    public CompetitionService(ICompetitionRepo competitionRepo, IChallengeRepo challengeRepo, IMappingService mappingService, IAdminRepo adminRepo, IParticipantRepo participantRepo)
    {
      _competitionRepo = competitionRepo;
      _challengeRepo = challengeRepo;
      _mappingService = mappingService;
      _adminRepo = adminRepo;
      _participantRepo = participantRepo;
    }

    //note - for admin actions, competition can't be null or won't pass authorization

    public async Task<CompetitionResponse> GetCompetition(Guid userId, Guid competitionId)
    {
      var admin = await _adminRepo.Get(userId, competitionId);
      var competition = await _competitionRepo.GetWithInfo(competitionId);
      competition.EnsureExists("Competition not found.");

      if (admin != null)
      {
        return new CompetitionResponse(competition, true, userId);
      }

      var participant = competition.Participants.FirstOrDefault(x => x.UserId == userId);

      if (participant != null || !competition.IsPrivate)
      {
        return new CompetitionResponse(competition, false, userId);
      }

      throw new ApiError(403);
    }

    public async Task<CompetitionResponse> AddCompetition(Guid userId, CompetitionRequest request)
    {
      var challenge = _mappingService.CreateChallenge(request);
      var competition = _mappingService.CreateCompetition(challenge.ChallengeId, request);

      _challengeRepo.Create(challenge);
      _competitionRepo.Create(competition);
      _participantRepo.Create(new Participant(userId, competition.CompetitionId));
      _adminRepo.Create(new Admin(userId, competition.CompetitionId));
      await _competitionRepo.Save();

      return new CompetitionResponse(competition, true, userId);
    }

    public async Task<CompetitionResponse> UpdateCompetition(Guid competitionId, CompetitionRequest request)
    {
      var existingCompetition = await _competitionRepo.GetWithInfo(competitionId);

      var updatedChallenge = _mappingService.UpdateChallenge(existingCompetition.Challenge, request);
      var updatedCompetition = _mappingService.UpdateCompetition(existingCompetition, request);

      _challengeRepo.Update(updatedChallenge);
      _competitionRepo.Update(updatedCompetition);
      await _competitionRepo.Save();

      //userId is not required if user is admin
      return new CompetitionResponse(updatedCompetition, true, Guid.NewGuid());
    }

    public async Task DeleteCompetition(Guid competitionId)
    {
      var competition = await _competitionRepo.Get(competitionId);
      _competitionRepo.Delete(competition);
      await _competitionRepo.Save();
    }
  }
}
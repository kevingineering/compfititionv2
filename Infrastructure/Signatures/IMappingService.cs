using System;
using Core.Entity;
using Infrastructure.Models.Request;
using Infrastructure.Models.Response;

namespace Infrastructure.Signatures
{
  public interface IMappingService
  {
    Challenge CreateChallenge(ChallengeRequest request);
    Goal CreateGoal(Guid userId, Guid challengeId, GoalRequest request);
    Competition CreateCompetition(Guid challengeId, CompetitionRequest request);

    Challenge UpdateChallenge(Challenge existingChallenge, ChallengeRequest request);
    Goal UpdateGoal(Goal existingGoal, GoalRequest request);
    Competition UpdateCompetition(Competition existingCompetition, CompetitionRequest request);

    UserInfoResponse CreateUserInfoResponse(User user);
    DifferentUserInfoResponse CreateDifferentUserInfoResponse(Guid userId, User differentUser);
  }
}
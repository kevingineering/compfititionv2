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
  public class GoalService : IGoalService
  {
    private readonly IGoalRepo _goalRepo;
    private readonly IChallengeRepo _challengeRepo;
    private readonly IMappingService _mappingService;

    public GoalService(IGoalRepo goalRepo, IChallengeRepo challengeRepo, IMappingService mappingService)
    {
      _goalRepo = goalRepo;
      _challengeRepo = challengeRepo;
      _mappingService = mappingService;
    }

    public async Task<GoalResponse> GetGoal(Guid userId, Guid goalId)
    {
      var goal = await _goalRepo.Get(goalId);
      goal.EnsureExists("Goal not found.");

      if (goal.UserId != userId && goal.IsPrivate)
      {
        throw new ApiError(403, "You are not permitted to see this goal.");
      }

      return new GoalResponse(goal);
    }

    public async Task<GoalResponse> AddGoal(Guid userId, GoalRequest request)
    {
      var challenge = _mappingService.CreateChallenge(request);
      var goal = _mappingService.CreateGoal(userId, challenge.ChallengeId, request);

      _challengeRepo.Create(challenge);
      _goalRepo.Create(goal);
      await _goalRepo.Save();

      return new GoalResponse(goal);
    }

    public async Task<GoalResponse> UpdateGoal(Guid userId, Guid goalId, GoalRequest request)
    {
      var existingGoal = await _goalRepo.Get(goalId);
      existingGoal.EnsureExists("Goal not found.");

      VerifyUserOwnsGoal(userId, existingGoal);

      var updatedChallenge = _mappingService.UpdateChallenge(existingGoal.Challenge, request);
      var updatedGoal = _mappingService.UpdateGoal(existingGoal, request);

      _challengeRepo.Update(updatedChallenge);
      _goalRepo.Update(updatedGoal);
      await _goalRepo.Save();

      return new GoalResponse(updatedGoal);
    }

    public async Task<GoalResponse> UpdateGoalLedger(Guid userId, LedgerRequest request)
    {
      var goal = await _goalRepo.Get(request.GoalId);
      goal.EnsureExists("Goal not found.");
      VerifyUserOwnsGoal(userId, goal);

      // //verify ledger is of correct type
      foreach (var item in request.Ledger)
      {
        if (item != null && item.GetType() != typeof(Decimal))
        {
          throw new ApiError(400, "Invalid inputs.");
        }
      }

      goal.Ledger = JsonSerializer.Serialize(request.Ledger);
      _goalRepo.Update(goal);
      await _goalRepo.Save();

      return new GoalResponse(goal);
    }

    public async Task DeleteGoal(Guid userId, Guid goalId)
    {
      var existingGoal = await _goalRepo.Get(goalId);
      existingGoal.EnsureExists("Goal not found.");
      VerifyUserOwnsGoal(userId, existingGoal);

      _goalRepo.Delete(existingGoal);
      await _goalRepo.Save("Problem deleting goal.");
    }

    private void VerifyUserOwnsGoal(Guid userId, Goal goal)
    {
      if (goal.UserId != userId)
      {
        throw new ApiError(403);
      }
    }
  }
}
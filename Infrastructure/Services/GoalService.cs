using System;
using System.Collections.Generic;
using System.Linq;
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

    public GoalService(IGoalRepo goalRepo, IChallengeRepo challengeRepo)
    {
      _goalRepo = goalRepo;
      _challengeRepo = challengeRepo;
    }

    public async Task<GoalResponse> GetGoal(Guid userId, Guid goalId)
    {
      var goal = await _goalRepo.GetGoal(goalId);
      goal.EnsureExists("Goal not found.");

      if (goal.UserId != userId && goal.IsPrivate)
      {
        throw new ApiError(403, "You are not permitted to see this goal.");
      }

      return new GoalResponse(goal);
    }

    public async Task<IReadOnlyList<GoalResponse>> GetUserGoals(Guid userId)
    {
      var goals = await _goalRepo.GetUserGoals(userId);
      return goals.Select(goal => new GoalResponse(goal)).ToList();
    }

    public async Task<GoalResponse> AddGoal(Guid userId, GoalRequest request)
    {
      var challenge = new Challenge(request.Name, request.Duration, request.StartTime, request.Category, request.Description, request.Units, request.DaysPerWeek);
      var goal = new Goal(userId, challenge.ChallengeId, request.InitialValue, request.Target, request.IsPrivate);
      goal.Challenge = challenge;

      //TODO - Test without add challenge?
      _challengeRepo.AddChallenge(challenge);
      _goalRepo.AddGoal(goal);
      await _goalRepo.Save();

      return new GoalResponse(goal);
    }

    public async Task<GoalResponse> UpdateGoal(Guid userId, Guid goalId, GoalRequest request)
    {
      var goal = await _goalRepo.GetGoal(goalId);
      goal.EnsureExists("Goal not found.");
      var challenge = goal.Challenge;

      VerifyUserOwnsGoal(userId, goal);

      if (challenge.StartTime.AddDays(challenge.Duration) < DateTime.Now)
      {
        throw new ApiError(400, "You cannot change goals that have already finished.");
      }

      if (challenge.StartTime.AddDays(request.Duration) < DateTime.Now)
      {
        throw new ApiError(400, "Duration can not end in the past.");
      }

      if (Enum.TryParse<CategoryEnum>(request.Category, out CategoryEnum result))
      {
      }
      else
      {
        throw new ApiError(400);
      }

      //these properties can change for any goal that is not finished
      challenge.Name = request.Name;
      challenge.Duration = request.Duration;
      challenge.Description = request.Description;
      challenge.Units = request.Units;
      goal.Target = request.Target;
      goal.IsPrivate = request.IsPrivate;
      goal.InitialValue = request.InitialValue;

      //these properties can only change before a goal begins
      if (challenge.StartTime > DateTime.Now)
      {
        if (request.StartTime < DateTime.Now)
        {
          throw new ApiError(400, "Start date cannot be in the past.");
        }
        challenge.StartTime = request.StartTime;
        challenge.Category = result;
        challenge.DaysPerWeek = request.DaysPerWeek;
      }

      _goalRepo.UpdateGoal(goal);
      await _goalRepo.Save();

      return new GoalResponse(goal);
    }

    public async Task<GoalResponse> UpdateGoalLedger(Guid userId, LedgerRequest request)
    {
      var goal = await _goalRepo.GetGoal(request.GoalId);
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
      _goalRepo.UpdateGoal(goal);
      await _goalRepo.Save();

      return new GoalResponse(goal);
    }

    public async Task DeleteGoal(Guid userId, Guid goalId)
    {
      var goal = await _goalRepo.GetGoal(goalId);
      goal.EnsureExists("Goal not found.");
      VerifyUserOwnsGoal(userId, goal);

      _goalRepo.DeleteGoal(goal);
      await _goalRepo.Save();
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
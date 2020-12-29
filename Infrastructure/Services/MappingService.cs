using System;
using System.Collections.Generic;
using System.Linq;
using Core.Entity;
using Core.Errors;
using Infrastructure.Models.Request;
using Infrastructure.Models.Response;
using Infrastructure.Signatures;

namespace Infrastructure.Services
{
  public class MappingService : IMappingService
  {
    //these exist instead of constructors because the Core does not know about the requests
    public Challenge CreateChallenge(ChallengeRequest request)
    {
      VerifyStartTime(request.StartTime);

      return new Challenge
      {
        ChallengeId = Guid.NewGuid(),
        Name = request.Name,
        Duration = request.Duration,
        StartTime = request.StartTime,
        Category = ConvertString(request.Category),
        Description = request.Description,
        Units = request.Units,
        DaysPerWeek = request.DaysPerWeek
      };
    }

    public Goal CreateGoal(Guid userId, Guid challengeId, GoalRequest request)
    {
      return new Goal
      {
        UserId = userId,
        ChallengeId = challengeId,
        InitialValue = request.InitialValue,
        Target = request.Target,
        IsPrivate = request.IsPrivate
      };
    }

    public Competition CreateCompetition(Guid challengeId, CompetitionRequest request)
    {
      return new Competition
      {
        ChallengeId = challengeId,
        IsHighestScoreWins = request.IsHighestScoreWins,
        IsPrivate = request.IsPrivate,
      };
    }

    public Challenge UpdateChallenge(Challenge existingChallenge, ChallengeRequest request)
    {
      VerifyNotFinished(existingChallenge.StartTime, existingChallenge.Duration);
      VerifyDuration(existingChallenge.StartTime, request.Duration);

      //these properties can change for any challenge that is not finished
      existingChallenge.Name = request.Name;
      existingChallenge.Duration = request.Duration;
      existingChallenge.Description = request.Description;
      existingChallenge.Units = request.Units;

      //these properties can only change before a challenge begins
      if (existingChallenge.StartTime > DateTime.Now)
      {
        if (request.StartTime < DateTime.Now)
        {
          throw new ApiError(400, "Start date cannot be in the past.");
        }
        existingChallenge.StartTime = request.StartTime;
        existingChallenge.Category = ParseCategory(request.Category);
        existingChallenge.DaysPerWeek = request.DaysPerWeek;
      }

      return existingChallenge;
    }

    public Goal UpdateGoal(Goal existingGoal, GoalRequest request)
    {
      existingGoal.Target = request.Target;
      existingGoal.IsPrivate = request.IsPrivate;
      existingGoal.InitialValue = request.InitialValue;
      return existingGoal;
    }

    public Competition UpdateCompetition(Competition existingCompetition, CompetitionRequest request)
    {
      existingCompetition.IsPrivate = request.IsPrivate;
      existingCompetition.IsHighestScoreWins = request.IsHighestScoreWins;
      return existingCompetition;
    }

    private CategoryEnum ConvertString(string category)
    {
      if (Enum.TryParse<CategoryEnum>(category, out CategoryEnum result))
      {
        return result;
      }
      else
      {
        throw new ApiError(400);
      }
    }

    private void VerifyStartTime(DateTime startTime)
    {
      if (startTime < DateTime.Now)
      {
        throw new ApiError(400, "Start date cannot be in the past.");
      }
    }

    private void VerifyNotFinished(DateTime startTime, int duration)
    {
      if (startTime.AddDays(duration) < DateTime.Now)
      {
        throw new ApiError(400, "You cannot change goals that have already finished.");
      }
    }

    private void VerifyDuration(DateTime startTime, int duration)
    {
      if (startTime.AddDays(duration) < DateTime.Now)
      {
        throw new ApiError(400, "Duration can not end in the past.");
      }
    }

    private CategoryEnum ParseCategory(string category)
    {
      if (Enum.TryParse<CategoryEnum>(category, out CategoryEnum result))
      {
      }
      else
      {
        throw new ApiError(400);
      }

      return result;
    }

    public DifferentUserInfoResponse CreateDifferentUserInfoResponse(Guid userId, User differentUser)
    {
      var differentUserFriends = (differentUser.User1Friends.Select(x => new DifferentUserResponse(x.User2))
          .Concat(differentUser.User2Friends.Select(x => new DifferentUserResponse(x.User1))))
          .ToList();

      var isFriend = differentUserFriends.FirstOrDefault(x => x.UserId == userId) != null;

      differentUserFriends = isFriend ? differentUserFriends : new List<DifferentUserResponse>();

      var emptyList = new List<GoalResponse>();

      var differentUserInfo = CreateUserInfoHelper(differentUser);

      var differentUserPastGoals = isFriend ? differentUserInfo.ActiveGoals
        .Where(x => !x.IsPrivate)
        .ToList()
        : emptyList;

      var differentUserActiveGoals = isFriend ? differentUserInfo.PastGoals
        .Where(x => !x.IsPrivate)
        .ToList()
        : emptyList;

      var differentUserPastCompetitions = isFriend ? differentUserInfo.ActiveCompetitions
        .Where(x => !x.IsPrivate)
        .ToList()
        : emptyList;

      var differentUserActiveCompetitions = isFriend ? differentUserInfo.PastCompetitions
        .Where(x => !x.IsPrivate)
        .ToList()
        : emptyList;

      return new DifferentUserInfoResponse
      {
        UserId = differentUser.UserId,
        Name = differentUser.Name,
        Email = differentUser.Email,
        PastGoals = differentUserPastGoals,
        ActiveGoals = differentUserActiveGoals,
        PastCompetitions = differentUserPastCompetitions,
        ActiveCompetitions = differentUserActiveCompetitions,
        Friends = differentUserFriends,
        IsFriend = isFriend
      };
    }

    public UserInfoResponse CreateUserInfoResponse(User user)
    {
      var userInfo = CreateUserInfoHelper(user);

      var usersWhoSentFriendRequest = user.Receivers.Select(x => new DifferentUserResponse(x.Sender)).ToList();

      return new UserInfoResponse
      {
        UsersWhoSentFriendRequest = usersWhoSentFriendRequest,
        PastGoals = userInfo.PastGoals,
        ActiveGoals = userInfo.ActiveGoals,
        PastCompetitions = userInfo.PastCompetitions,
        ActiveCompetitions = userInfo.ActiveCompetitions,
        Friends = userInfo.Friends,
      };
    }

    private UserInfoHelper CreateUserInfoHelper(User user)
    {
      var friends = (user.User1Friends.Select(x => new DifferentUserResponse(x.User2))
          .Concat(user.User2Friends.Select(x => new DifferentUserResponse(x.User1))))
          .OrderBy(x => x.Name)
          .ToList();

      var emptyList = new List<GoalResponse>();

      var pastGoals = user.Goals
        .Where(x => x.Challenge.StartTime.AddDays(x.Challenge.Duration) < DateTime.Now)
        .Select(x => new GoalResponse(x))
        .OrderBy(x => x.StartTime)
        .ToList();

      var activeGoals = user.Goals
        .Where(x => x.Challenge.StartTime.AddDays(x.Challenge.Duration) > DateTime.Now)
        .Select(x => new GoalResponse(x))
        .OrderBy(x => x.StartTime)
        .ToList();

      //note competitions are returned as individual goals for display on user dashboard
      var pastCompetitions = user.Participations
        .Where(x =>
          x.Competition.Challenge.StartTime.AddDays(x.Competition.Challenge.Duration) < DateTime.Now)
        .Select(x => new GoalResponse(x.Competition, x))
        .OrderBy(x => x.StartTime)
        .ToList();

      //note competitions are returned as individual goals for display on user dashboard
      var activeCompetitions = user.Participations
        .Where(x =>
          x.Competition.Challenge.StartTime.AddDays(x.Competition.Challenge.Duration) > DateTime.Now
          && !x.Competition.IsPrivate)
        .Select(x => new GoalResponse(x.Competition, x))
        .OrderBy(x => x.StartTime)
        .ToList();

      return new UserInfoResponse
      {
        PastGoals = pastGoals,
        ActiveGoals = activeGoals,
        PastCompetitions = pastCompetitions,
        ActiveCompetitions = activeCompetitions,
        Friends = friends
      };
    }
  }
}
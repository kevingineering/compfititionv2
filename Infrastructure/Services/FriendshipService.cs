using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entity;
using Core.Errors;
using Core.Interfaces.Repos;
using Infrastructure.Models.Response;
using Infrastructure.Signatures;

namespace Infrastructure.Services
{
  public class FriendshipService : IFriendshipService
  {
    private readonly IFriendshipRepo _friendshipRepo;
    private readonly IFriendRequestRepo _friendRequestRepo;

    public FriendshipService(IFriendshipRepo friendshipRepo, IFriendRequestRepo friendRequestRepo)
    {
      _friendshipRepo = friendshipRepo;
      _friendRequestRepo = friendRequestRepo;
    }

    public async Task<OtherUserInfoResponse> GetOtherUserInfo(Guid userId, Guid friendId)
    {
      var friend = await _friendshipRepo.GetOtherUserInfo(friendId);
      friend.EnsureExists("User not found.");

      var friendInfoResponse = CreateOtherUserInfoResponse(userId, friend);

      return friendInfoResponse;
    }

    public async Task<IReadOnlyList<DifferentUserResponse>> GetFriends(Guid userId)
    {
      var friends = await _friendshipRepo.GetFriends(userId);
      return friends.Select(x => new DifferentUserResponse(x)).OrderBy(x => x.Name).ToList();
    }

    public async Task<OtherUserInfoResponse> AddFriend(Guid userId, Guid friendId)
    {
      var existingFriendship = await _friendshipRepo.GetFriend(userId, friendId);
      existingFriendship.EnsureDoesNotExist();

      var existingRequest = await _friendRequestRepo.GetFriendRequest(userId, friendId);
      existingRequest.EnsureExists("Friend request not found.");
      if (existingRequest.SenderId == userId)
      {
        throw new ApiError(403, "You cannot accept a friend request you sent.");
      }

      var friendship = new Friendship(userId, friendId);
      _friendshipRepo.AddFriendship(friendship);
      _friendRequestRepo.DeleteFriendRequest(existingRequest);
      await _friendshipRepo.Save();

      var friend = await _friendshipRepo.GetOtherUserInfo(friendId);

      var friendInfoResponse = CreateOtherUserInfoResponse(userId, friend);

      return friendInfoResponse;
    }

    public async Task DeleteFriend(Guid userId, Guid friendId)
    {
      var friendship = await _friendshipRepo.GetFriendship(userId, friendId);
      friendship.EnsureExists("Friendship not found.");

      _friendshipRepo.DeleteFriendship(friendship);
      await _friendshipRepo.Save();
    }

    public OtherUserInfoResponse CreateOtherUserInfoResponse(Guid userId, User friend)
    {
      var friendFriends = (friend.User1Friends.Select(x => new DifferentUserResponse(x.User2))
          .Concat(friend.User2Friends.Select(x => new DifferentUserResponse(x.User1))))
          .ToList();

      var isFriend = friendFriends.FirstOrDefault(x => x.UserId == userId) != null;

      friendFriends = isFriend ? friendFriends : new List<DifferentUserResponse>();

      var emptyList = new List<GoalResponse>();

      var friendPastGoals = isFriend ? friend.Goals
        .Where(x => x.Challenge.StartTime.AddDays(x.Challenge.Duration) < DateTime.Now && !x.IsPrivate)
        .Select(x => new GoalResponse(x))
        .ToList()
        : emptyList;

      var friendActiveGoals = isFriend ? friend.Goals
        .Where(x => x.Challenge.StartTime.AddDays(x.Challenge.Duration) > DateTime.Now && !x.IsPrivate)
        .Select(x => new GoalResponse(x))
        .ToList()
        : emptyList;

      //note competitions are returned as individual goals for display on user dashboard
      var friendPastCompetitions = isFriend ? friend.Participations
        .Where(x =>
          x.Competition.Challenge.StartTime.AddDays(x.Competition.Challenge.Duration) < DateTime.Now
          && !x.Competition.IsPrivate)
        .Select(x => new GoalResponse(x.Competition, x))
        .ToList()
        : emptyList;

      //note competitions are returned as individual goals for display on user dashboard
      var friendActiveCompetitions = isFriend ? friend.Participations
        .Where(x =>
          x.Competition.Challenge.StartTime.AddDays(x.Competition.Challenge.Duration) > DateTime.Now
          && !x.Competition.IsPrivate)
        .Select(x => new GoalResponse(x.Competition, x))
        .ToList()
        : emptyList;

      return new OtherUserInfoResponse
      {
        UserId = friend.UserId,
        Email = friend.Email,
        Name = friend.Name,
        PastGoals = friendPastGoals,
        ActiveGoals = friendActiveGoals,
        PastCompetitions = friendPastCompetitions,
        ActiveCompetitions = friendActiveCompetitions,
        Friends = friendFriends,
        IsFriend = isFriend
      };
    }
  }
}
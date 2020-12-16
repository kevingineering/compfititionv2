using System;
using System.Linq;
using System.Threading.Tasks;
using Core.Entity;
using Core.Errors;
using Core.Interfaces.Repos;
using Infrastructure.Models.Response;
using Infrastructure.Signatures;

namespace Infrastructure.Services
{
  public class FriendRequestService : IFriendRequestService
  {
    private readonly IFriendRequestRepo _friendRequestRepo;
    private readonly IUserRepo _userRepo;
    private readonly IFriendshipRepo _friendshipRepo;

    public FriendRequestService(IFriendRequestRepo friendRequestRepo, IUserRepo userRepo, IFriendshipRepo friendshipRepo)
    {
      _friendRequestRepo = friendRequestRepo;
      _userRepo = userRepo;
      _friendshipRepo = friendshipRepo;
    }

    public async Task<UsersWhoSentFriendRequestResponse> GetUsersWhoSentFriendRequest(Guid userId)
    {
      var users = (await _friendRequestRepo.GetUsersWhoSentFriendRequest(userId));
      return new UsersWhoSentFriendRequestResponse(users
        .Select(x => new DifferentUserResponse(x))
        .ToList()
      );
    }

    public async Task<FriendRequestUserInfoResponse> GetFriendRequestUserInfo(Guid userId)
    {
      var searchableUsers = await _userRepo.GetSearchableUsers(userId);
      var friends = await _friendshipRepo.GetFriends(userId);
      var friendRequests = await _friendRequestRepo.GetFriendRequestsWithUsers(userId);

      var usersWhoReceivedFriendRequest = friendRequests
        .Where(x => x.SenderId == userId)
        .Select(x => x.Receiver);
      var usersWhoSentFriendRequest = friendRequests
        .Where(x => x.ReceiverId == userId)
        .Select(x => x.Sender);
      var filteredSearchableUsers = searchableUsers
        .Except(friends)
        .Except(usersWhoReceivedFriendRequest)
        .Except(usersWhoSentFriendRequest);

      return new FriendRequestUserInfoResponse
      {
        UsersWhoSentFriendRequest = usersWhoSentFriendRequest
          .Select(x => new DifferentUserResponse(x.UserId, x.Email, x.Name))
          .ToList(),
        UsersWhoReceivedFriendRequest = usersWhoReceivedFriendRequest
          .Select(x => new DifferentUserResponse(x.UserId, x.Email, x.Name))
          .ToList(),
        SearchableUsers = filteredSearchableUsers
          .Select(x => new DifferentUserResponse(x.UserId, x.Email, x.Name))
          .ToList()
      };
    }

    public async Task AddFriendRequest(Guid userId, Guid friendId)
    {
      if (userId == friendId)
      {
        throw new ApiError(400, "You cannot add yourself as a friend.");
      }

      var user = await _userRepo.GetUser(friendId);
      user.EnsureExists("User not found.");

      var existingFriendRequest = await _friendRequestRepo.GetFriendRequest(userId, friendId);
      existingFriendRequest.EnsureDoesNotExist();

      var existingFriend = await _friendshipRepo.GetFriend(userId, friendId);
      existingFriend.EnsureDoesNotExist("Friendship already exists.");

      _friendRequestRepo.AddFriendRequest(new FriendRequest(userId, friendId));
      await _friendRequestRepo.Save();

      var temp = await _friendRequestRepo.GetFriendRequest(userId, friendId);

    }

    public async Task RejectOrDeleteFriendRequest(Guid userId, Guid friendId)
    {
      var friendRequest = await _friendRequestRepo.GetFriendRequest(userId, friendId);
      friendRequest.EnsureExists("Friend request not found.");

      _friendRequestRepo.DeleteFriendRequest(friendRequest);
      await _friendRequestRepo.Save();
    }
  }
}
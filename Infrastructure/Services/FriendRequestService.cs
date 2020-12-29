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

    public async Task<FriendRequestInfoResponse> GetUserFriendRequestInfo(Guid userId)
    {
      var searchableUsers = await _userRepo.GetSearchableUsers(userId);
      var friends = await _friendshipRepo.GetList(userId);
      var friendRequests = await _friendRequestRepo.GetUsersWithFriendRequests(userId);

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

      return new FriendRequestInfoResponse
      {
        UsersWhoSentFriendRequest = usersWhoSentFriendRequest
          .Select(x => new DifferentUserResponse(x))
          .ToList(),
        UsersWhoReceivedFriendRequest = usersWhoReceivedFriendRequest
          .Select(x => new DifferentUserResponse(x))
          .ToList(),
        SearchableUsers = filteredSearchableUsers
          .Select(x => new DifferentUserResponse(x))
          .ToList()
      };
    }

    public async Task AddFriendRequest(Guid userId, Guid differentUserId)
    {
      if (userId == differentUserId)
      {
        throw new ApiError(400, "You cannot add yourself as a friend.");
      }

      var existingUser = await _userRepo.Get(differentUserId);
      existingUser.EnsureExists("User not found.");

      var existingFriendRequest = await _friendRequestRepo.Get(userId, differentUserId);
      existingFriendRequest.EnsureDoesNotExist();

      var existingFriend = await _friendshipRepo.Get(userId, differentUserId);
      existingFriend.EnsureDoesNotExist("Friendship already exists.");

      _friendRequestRepo.Create(new FriendRequest(userId, differentUserId));
      await _friendRequestRepo.Save();

      var temp = await _friendRequestRepo.Get(userId, differentUserId);

    }

    public async Task DeleteFriendRequest(Guid userId, Guid differentUserId)
    {
      var existingFriendRequest = await _friendRequestRepo.Get(userId, differentUserId);
      existingFriendRequest.EnsureExists("Friend request not found.");

      _friendRequestRepo.Delete(existingFriendRequest);
      await _friendRequestRepo.Save();
    }
  }
}
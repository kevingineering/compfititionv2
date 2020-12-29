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
    private readonly IMappingService _mappingService;

    public FriendshipService(IFriendshipRepo friendshipRepo, IFriendRequestRepo friendRequestRepo, IMappingService mappingService)
    {
      _friendshipRepo = friendshipRepo;
      _friendRequestRepo = friendRequestRepo;
      _mappingService = mappingService;
    }

    public async Task<IReadOnlyList<DifferentUserResponse>> GetFriends(Guid userId)
    {
      var friends = await _friendshipRepo.GetList(userId);
      return friends.Select(x => new DifferentUserResponse(x)).ToList();
    }

    public async Task<DifferentUserInfoResponse> GetDifferentUserInfo(Guid userId, Guid differentUserId)
    {
      var differentUser = await _friendshipRepo.GetDifferentUserInfo(differentUserId);
      differentUser.EnsureExists("User not found.");

      var differentUserInfoResponse = _mappingService.CreateDifferentUserInfoResponse(userId, differentUser);

      return differentUserInfoResponse;
    }

    public async Task<DifferentUserInfoResponse> AddFriend(Guid userId, Guid differentUserId)
    {
      var existingFriendship = await _friendshipRepo.Get(userId, differentUserId);
      existingFriendship.EnsureDoesNotExist();

      var existingRequest = await _friendRequestRepo.Get(userId, differentUserId);
      existingRequest.EnsureExists("Friend request not found.");
      if (existingRequest.SenderId == userId)
      {
        throw new ApiError(403, "You cannot accept a friend request you sent.");
      }

      var friendship = new Friendship(userId, differentUserId);
      _friendshipRepo.Create(friendship);
      _friendRequestRepo.Delete(existingRequest);
      await _friendshipRepo.Save();

      var friend = await _friendshipRepo.GetDifferentUserInfo(differentUserId);

      var friendInfoResponse = _mappingService.CreateDifferentUserInfoResponse(userId, friend);

      return friendInfoResponse;
    }

    public async Task DeleteFriend(Guid userId, Guid differentUserId)
    {
      var existingFriendship = await _friendshipRepo.Get(userId, differentUserId);
      existingFriendship.EnsureExists("Friendship not found.");

      _friendshipRepo.Delete(existingFriendship);
      await _friendshipRepo.Save();
    }
  }
}
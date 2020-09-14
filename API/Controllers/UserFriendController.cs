using System;
using System.Threading.Tasks;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications.Friends;
using Core.Specifications.Goals;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Core.Specifications.Users;
using System.Collections.Generic;
using API.DTOs.GoalDTOs;
using API.DTOs.UserDTOs;
using API.DTOs;

namespace API.Controllers
{
  public class UserFriendController : BaseController
  {
    // /userfriend
    //   POST    /:friendId          add friend (and delete friend request)
    //   GET     /                   get user friends
    //   GET     /goals/:friendId    get friend's public goals
    //   GET     /friends/:friendId  get friend's searchable friends
    //   DELETE  /:friendId          delete friend

    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public UserFriendController(IUnitOfWork unitOfWork, IMapper mapper)
    {
      _unitOfWork = unitOfWork;
      _mapper = mapper;
    }

    //request service, friend service, user service, goal service

    //CREATE

    [HttpPost("{friendId}")]
    public async Task<ActionResult> AddFriend(Guid friendId)
    {
      var userId = GetUserIdFromClaims();

      //ensure friendship does not already exist
      var friendshipSpec = new FriendshipWithBothIdsSpec(userId, friendId);
      var existingFriendship = await _unitOfWork.Repository<UserFriendship>().GetEntityWithSpec(friendshipSpec);
      if (existingFriendship != null)
      {
        return BadRequest(new ApiError(400, "You are already friends."));
      }

      //check request
      var requestSpec = new RequestsWithBothIdsSpec(userId, friendId);
      var existingRequest = await _unitOfWork.Repository<UserFriendRequest>().GetEntityWithSpec(requestSpec);
      if (existingRequest == null)
      {
        return NotFound(new ApiError(404, "Request not found."));
      }

      //delete request and add friendship
      _unitOfWork.Repository<UserFriendRequest>().Delete(existingRequest);
      var friendship = new UserFriendship(userId, friendId);
      _unitOfWork.Repository<UserFriendship>().Add(friendship);
      var result = await _unitOfWork.Complete();
      if (result <= 0)
      {
        return BadRequest(new ApiError(400, "Error creating friendship."));
      }

      return Ok(_mapper.Map<UserFriendship, UserFriendshipDTO>(friendship));
    }

    //READ

    [HttpGet]
    public async Task<ActionResult> GetFriends()
    {
      var userId = GetUserIdFromClaims();
      var spec = new FriendshipWithUserIdSpec(userId);
      var friends = await _unitOfWork.Repository<UserFriendship>().ListAsync(spec);
      return Ok(_mapper.Map<IReadOnlyList<UserFriendship>, IReadOnlyList<UserFriendshipDTO>>(friends));
    }

    //TODO - make only private goals available
    [HttpGet("goals/{friendId}")]
    public async Task<ActionResult<IReadOnlyList<GoalReturnDTO>>> GetFriendGoals(Guid friendId)
    {
      //verify users are friends
      var userId = GetUserIdFromClaims();
      var friendshipSpec = new FriendshipWithBothIdsSpec(userId, friendId);
      var existing = await _unitOfWork.Repository<UserFriendship>().GetEntityWithSpec(friendshipSpec);
      if (existing == null)
      {
        return Unauthorized(new ApiError(403, "You are not friends with this user."));
      }

      //get public goals
      var goalSpec = new PublicGoalsWithUserIdSpec(friendId);
      var goals = await _unitOfWork.Repository<Goal>().ListAsync(goalSpec);
      return Ok(_mapper.Map<IReadOnlyList<Goal>, IReadOnlyList<GoalReturnDTO>>(goals));
    }

    [HttpGet("friends/{friendId}")]
    public async Task<ActionResult> GetFriendSearchableFriends(Guid friendId)
    {
      //verify users are friends
      var userId = GetUserIdFromClaims();
      var friendshipSpec = new FriendshipWithBothIdsSpec(userId, friendId);
      var existing = await _unitOfWork.Repository<UserFriendship>().GetEntityWithSpec(friendshipSpec);
      if (existing == null)
      {
        return Unauthorized(new ApiError(403, "You are not friends with this user."));
      }

      //get friend friendships
      var friendSpec = new FriendshipWithUserIdSpec(friendId);
      var friendships = await _unitOfWork.Repository<UserFriendship>().ListAsync(friendSpec);

      //get array of friendIds
      var friendIds = friendships.Select(x => x.User1Id == friendId ? x.User2Id : x.User1Id);

      //get searchable users
      var searchableUserSpec = new SearchableUserSpec();
      var searchableUsers = await _unitOfWork.Repository<User>().ListAsync(searchableUserSpec);

      //join tables
      var searchableFriends = searchableUsers.Join(friendIds, u => u.Id, guid => guid, (u, guid) => u);
      return Ok(_mapper.Map<IEnumerable<User>, IReadOnlyList<UserReturnDTO>>(searchableFriends));
    }

    [HttpDelete("{friendId}")]
    public async Task<ActionResult> DeleteFriend(Guid friendId)
    {
      var userId = GetUserIdFromClaims();
      var spec = new FriendshipWithBothIdsSpec(userId, friendId);
      var friendship = await _unitOfWork.Repository<UserFriendship>().GetEntityWithSpec(spec);
      if (friendship == null)
      {
        return NotFound(new ApiError(404, "Request not found."));
      }

      _unitOfWork.Repository<UserFriendship>().Delete(friendship);
      var result = await _unitOfWork.Complete();
      if (result <= 0)
      {
        return BadRequest(new ApiError(400, "Error deleting friendship."));
      }

      return NoContent();
    }
  }
}

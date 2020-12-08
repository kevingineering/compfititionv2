using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Errors;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using API.DTOs.ReturnDTOs;
using AutoMapper;
using Core.Specifications.Users;
using System.Linq;
using Core.Specifications.Friendships;
using Core.Specifications.FriendRequests;

namespace API.Controllers
{
  public class FriendRequestController : BaseController
  {
    // /friendrequest
    //   POST    /:friendId          add friend request
    //   GET     /                   get friend requests
    //   GET     /received           get received requests
    //   DELETE  /:friendId          delete friend request

    private readonly IGenericService<UserFriendRequest> _friendRequestService;
    private readonly IGenericService<User> _userService;
    private readonly IMapper _mapper;
    private readonly IGenericService<UserFriendship> _friendshipService;

    public FriendRequestController(IGenericService<UserFriendRequest> friendRequestService, IGenericService<UserFriendship> friendshipService, IGenericService<User> userService, IMapper mapper)
    {
      _friendshipService = friendshipService;
      _friendRequestService = friendRequestService;
      _userService = userService;
      _mapper = mapper;
    }

    [HttpPost("{friendId}")]
    public async Task<ActionResult<DifferentUserReturnDTO>> AddRequest(Guid friendId)
    {
      var userId = GetUserIdFromClaims();

      //ensure not adding self
      if (userId == friendId)
      {
        return BadRequest(new ApiError(400, "You cannot become friends with yourself."));
      }

      //ensure user exists
      var friend = await _userService.GetByIdAsync(friendId);

      if (friend == null)
      {
        return NotFound(new ApiError(404, "User not found."));
      }

      //ensure request does not already exist
      var requestSpec = new FriendRequestSpec(userId, friendId);
      var existingRequest = await _friendRequestService.GetEntityWithSpecAsync(requestSpec);

      if (existingRequest != null)
      {
        return BadRequest(new ApiError(400, "Request already exists."));
      }

      //ensure users are not already friends
      var friendshipSpec = new FriendshipSpec(userId, friendId);
      var existingFriendship = await _friendshipService.GetEntityWithSpecAsync(friendshipSpec);

      if (existingFriendship != null)
      {
        return BadRequest(new ApiError(400, "You are already friends."));
      }

      //create request
      var request = new UserFriendRequest(userId, friendId);
      var isAdded = await _friendRequestService.AddAsync(request);

      if (isAdded == null)
      {
        return BadRequest(new ApiError(400, "Problem creating friend request."));
      }

      return Ok(_mapper.Map<User, DifferentUserReturnDTO>(friend));
    }

    [HttpGet]
    public async Task<ActionResult<UserFriendRequestReturnDTO>> GetRequestsAndSearchableUsers()
    {
      //get users who have a request from the user
      var userId = GetUserIdFromClaims();
      var requestSpec = new UserFriendRequestsSpec(userId);
      var requests = await _friendRequestService.GetListWithSpecAsync(requestSpec);

      //users who sent request to user
      var sentRequestUsers = requests
        .Where(x => x.ReceiverId == userId)
        .Select(x => x.Sender)
        .ToList();

      //users who received request from user
      var receivedRequestUsers = requests
        .Where(x => x.SenderId == userId)
        .Select(x => x.Receiver)
        .ToList();

      //get user friends (to exclude from list)
      var friendshipSpec = new FriendshipWithUserIdSpec(userId);
      var friends = (await _friendshipService.GetListWithSpecAsync(friendshipSpec))
        .Select(x => x.User1Id == userId ? x.User2 : x.User1);

      //get searchable users user could add as friend
      var searchableUsersSpec = new SearchableUserSpec(userId);
      var searchableUsers = await _userService.GetListWithSpecAsync(searchableUsersSpec);
      var requestableSearchableUsers = searchableUsers
        .Except(sentRequestUsers)
        .Except(receivedRequestUsers)
        .Except(friends)
        .ToList();

      var requestReturnDTO = new UserFriendRequestReturnDTO
      {
        SentRequestUsers = _mapper.Map<IReadOnlyList<User>, IReadOnlyList<DifferentUserReturnDTO>>(sentRequestUsers),
        ReceivedRequestUsers = _mapper.Map<IReadOnlyList<User>, IReadOnlyList<DifferentUserReturnDTO>>(receivedRequestUsers),
        SearchableUsers = _mapper.Map<IReadOnlyList<User>, IReadOnlyList<DifferentUserReturnDTO>>(requestableSearchableUsers)
      };

      return Ok(requestReturnDTO);
    }

    [HttpGet("received")]
    public async Task<ActionResult<ReceivedUserFriendRequestReturnDTO>> GetReceivedRequests()
    {
      //get users who have a request from the user
      var userId = GetUserIdFromClaims();
      var requestSpec = new UserFriendRequestsSpec(userId);
      var requests = await _friendRequestService.GetListWithSpecAsync(requestSpec);

      //users who sent request to user
      var sentRequestUsers = requests
        .Where(x => x.ReceiverId == userId)
        .Select(x => x.Sender)
        .ToList();

      return Ok(new ReceivedUserFriendRequestReturnDTO { SentRequestUsers = _mapper.Map<IReadOnlyList<User>, IReadOnlyList<DifferentUserReturnDTO>>(sentRequestUsers) });
    }

    [HttpDelete("{friendId}")]
    public async Task<ActionResult> RejectOrDeleteRequest(Guid friendId)
    {
      var userId = GetUserIdFromClaims();
      var spec = new FriendRequestSpec(userId, friendId);

      var existing = await _friendRequestService.GetEntityWithSpecAsync(spec);

      if (existing == null)
      {
        return NotFound(new ApiError(404, "Request not found."));
      }

      var isDeleted = await _friendRequestService.DeleteAsync(existing);

      if (!isDeleted)
      {
        return BadRequest(new ApiError(400, "Error deleting request."));
      }
      return NoContent();
    }
  }
}
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Errors;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Core.Specifications.Friends;
using API.DTOs.ReturnDTOs;
using AutoMapper;
using Core.Specifications.Users;
using System.Linq;

namespace API.Controllers
{
  public class UserFriendRequestController : BaseController
  {
    // /userfriendrequest
    //   POST    /:friendId          add friend request
    //   GET     /                   get friend requests
    //   DELETE  /:friendId          delete friend request

    private readonly IGenericService<UserFriendRequest> _friendRequestService;
    private readonly IGenericService<User> _userService;
    private readonly IMapper _mapper;
    private readonly IGenericService<UserFriendship> _friendshipService;

    public UserFriendRequestController(IGenericService<UserFriendRequest> friendRequestService, IGenericService<UserFriendship> friendshipService, IGenericService<User> userService, IMapper mapper)
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

      if (userId == friendId)
      {
        return BadRequest(new ApiError(400, "You cannot become friends with yourself."));
      }

      var friend = await _userService.GetByIdAsync(friendId);

      if (friend == null)
      {
        return NotFound(new ApiError(404, "User not found."));
      }

      var requestSpec = new RequestsWithBothIdsSpec(userId, friendId);
      var existingRequest = await _friendRequestService.GetEntityWithSpecAsync(requestSpec);

      if (existingRequest != null)
      {
        return BadRequest(new ApiError(400, "Request already exists."));
      }

      var friendshipSpec = new FriendshipWithBothIdsSpec(userId, friendId);
      var existingFriendship = await _friendshipService.GetEntityWithSpecAsync(friendshipSpec);

      if (existingFriendship != null)
      {
        return BadRequest(new ApiError(400, "You are already friends."));
      }

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
      //get sent and received requests by user id then get users who received and sent them respectively
      //also return searchable users individual could add as friend
      //TODO - do more in database?
      var userId = GetUserIdFromClaims();
      var sentSpec = new SentRequestsSpec(userId);
      var sentRequests = await _friendRequestService.GetListWithSpecAsync(sentSpec);
      var receivedSpec = new ReceivedRequestsSpec(userId);
      var receivedRequests = await _friendRequestService.GetListWithSpecAsync(receivedSpec);

      var sentUsersSpec = new UsersInIdArraySpec(sentRequests.Select(x => x.ReceiverId).ToList());
      var sentUsers = await _userService.GetListWithSpecAsync(sentUsersSpec);

      var receivedUsersSpec = new UsersInIdArraySpec(receivedRequests.Select(x => x.SenderId).ToList());
      var receivedUsers = await _userService.GetListWithSpecAsync(receivedUsersSpec);

      var searchableUsersSpec = new SearchableUserSpec(userId);
      var searchableUsers = await _userService.GetListWithSpecAsync(searchableUsersSpec);

      var friendshipSpec = new FriendshipWithUserIdSpec(userId);
      var friendships = await _friendshipService.GetListWithSpecAsync(friendshipSpec);

      var searchableUsersWithoutRequests = searchableUsers.Except(sentUsers).Except(receivedUsers).ToList();
      var friendshipIds = friendships.Select(x => x.User1Id == userId ? x.User2Id : x.User1Id);

      var searchableUsersWithoutRequestsOrFriends = new List<User>();

      searchableUsersWithoutRequests.ForEach(x =>
      {
        if (!friendshipIds.Contains(x.Id))
        {
          searchableUsersWithoutRequestsOrFriends.Add(x);
        }
      });

      var requestReturnDTO = new UserFriendRequestReturnDTO
      {
        SentRequestUsers = _mapper.Map<IReadOnlyList<User>, IReadOnlyList<DifferentUserReturnDTO>>(sentUsers),
        ReceivedRequestUsers = _mapper.Map<IReadOnlyList<User>, IReadOnlyList<DifferentUserReturnDTO>>(receivedUsers),
        SearchableUsers = _mapper.Map<IReadOnlyList<User>, IReadOnlyList<DifferentUserReturnDTO>>(searchableUsersWithoutRequestsOrFriends)
      };

      return Ok(requestReturnDTO);
    }

    [HttpDelete("{friendId}")]
    public async Task<ActionResult> RejectOrDeleteRequest(Guid friendId)
    {
      var userId = GetUserIdFromClaims();
      var spec = new RequestsWithBothIdsSpec(userId, friendId);

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
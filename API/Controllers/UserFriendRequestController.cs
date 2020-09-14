using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Errors;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Core.Specifications.Friends;
using API.DTOs;
using AutoMapper;

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

    public UserFriendRequestController(IGenericService<UserFriendRequest> friendRequestService, IGenericService<User> userService, IMapper mapper)
    {
      _friendRequestService = friendRequestService;
      _userService = userService;
      _mapper = mapper;
    }

    //CREATE

    [HttpPost("{friendId}")]
    public async Task<ActionResult<UserFriendRequestDTO>> AddRequest(Guid friendId)
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

      var spec = new RequestsWithBothIdsSpec(userId, friendId);
      var existing = await _friendRequestService.GetEntityWithSpecAsync(spec);

      if (existing != null)
      {
        return BadRequest(new ApiError(400, "Request already exists."));
      }

      var request = new UserFriendRequest(userId, friendId);
      var result = await _friendRequestService.AddAsync(request);

      if (result == null)
      {
        return BadRequest(new ApiError(400, "Problem creating friend request."));
      }

      var requestDTO = _mapper.Map<UserFriendRequest, UserFriendRequestDTO>(request);

      return Ok(requestDTO);
    }

    //READ

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<UserFriendRequestDTO>>> GetRequests()
    {
      var userId = GetUserIdFromClaims();
      var spec = new RequestsWithUserIdSpec(userId);
      var requests = await _friendRequestService.GetListWithSpecAsync(spec);
      var requestDTOs = _mapper.Map<IReadOnlyList<UserFriendRequest>, IReadOnlyList<UserFriendRequestDTO>>(requests);
      return Ok(requestDTOs);
    }

    //UPDATE

    //DELETE

    [HttpDelete("{friendId}")]
    public async Task<ActionResult> RejectRequest(Guid friendId)
    {
      var userId = GetUserIdFromClaims();
      var spec = new RequestsWithBothIdsSpec(userId, friendId);

      var existing = await _friendRequestService.GetEntityWithSpecAsync(spec);

      if (existing == null)
      {
        return NotFound(new ApiError(404, "Request not found."));
      }

      var result = await _friendRequestService.DeleteAsync(existing);

      if (!result)
      {
        return BadRequest(new ApiError(400, "Error deleting request."));
      }
      return NoContent();
    }
  }
}
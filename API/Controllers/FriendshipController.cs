using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Infrastructure.Models.Response;
using Infrastructure.Signatures;

namespace API.Controllers
{
  public class FriendshipController : ParentController
  {
    private readonly IFriendshipService _friendshipService;

    public FriendshipController(IFriendshipService friendshipService)
    {
      _friendshipService = friendshipService;
    }

    [HttpPost("{friendId}")]
    public async Task<ActionResult<DifferentUserResponse>> AddFriend(Guid friendId)
    {
      return Ok(await _friendshipService.AddFriend(UserId, friendId));
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<DifferentUserResponse>>> GetFriends()
    {
      return Ok(await _friendshipService.GetFriends(UserId));
    }

    [HttpGet("{friendId}")]
    public async Task<ActionResult<OtherUserInfoResponse>> GetOtherUserInfo(Guid friendId)
    {
      return Ok(await _friendshipService.GetOtherUserInfo(UserId, friendId));
    }

    [HttpDelete("{friendId}")]
    public async Task<ActionResult> DeleteFriend(Guid friendId)
    {
      await _friendshipService.DeleteFriend(UserId, friendId);
      return NoContent();
    }
  }
}

using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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

    [HttpPost("{differentUserId}")]
    public async Task<ActionResult<DifferentUserResponse>> AddFriend(Guid differentUserId)
    {
      return Ok(await _friendshipService.AddFriend(UserId, differentUserId));
    }

    [HttpGet]
    public async Task<ActionResult<DifferentUserInfoResponse>> GetFriends()
    {
      return Ok(await _friendshipService.GetFriends(UserId));
    }

    [HttpGet("{differentUserId}")]
    public async Task<ActionResult<DifferentUserInfoResponse>> GetDifferentUserInfo(Guid differentUserId)
    {
      return Ok(await _friendshipService.GetDifferentUserInfo(UserId, differentUserId));
    }

    [HttpDelete("{differentUserId}")]
    public async Task<ActionResult> DeleteFriend(Guid differentUserId)
    {
      await _friendshipService.DeleteFriend(UserId, differentUserId);
      return NoContent();
    }
  }
}

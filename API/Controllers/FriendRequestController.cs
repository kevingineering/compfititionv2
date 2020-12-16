using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Infrastructure.Models.Response;
using Infrastructure.Signatures;

namespace API.Controllers
{
  public class FriendRequestController : ParentController
  {
    private readonly IFriendRequestService _friendRequestService;

    public FriendRequestController(IFriendRequestService friendRequestService)
    {
      _friendRequestService = friendRequestService;
    }

    [HttpPost("{friendId}")]
    public async Task<ActionResult> AddFriendRequest(Guid friendId)
    {
      await _friendRequestService.AddFriendRequest(UserId, friendId);
      return NoContent();
    }

    [HttpGet]
    public async Task<ActionResult<FriendRequestUserInfoResponse>> GetFriendRequestUserInfo()
    {
      return Ok(await _friendRequestService.GetFriendRequestUserInfo(UserId));
    }

    [HttpGet("received")]
    public async Task<ActionResult<UsersWhoSentFriendRequestResponse>> GetUsersWhoSentFriendRequest()
    {
      return Ok(await _friendRequestService.GetUsersWhoSentFriendRequest(UserId));
    }

    [HttpDelete("{friendId}")]
    public async Task<ActionResult> RejectOrDeleteFriendRequest(Guid friendId)
    {
      await _friendRequestService.RejectOrDeleteFriendRequest(UserId, friendId);
      return NoContent();
    }
  }
}
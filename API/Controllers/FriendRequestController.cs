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

    [HttpPost("{differentUserId}")]
    public async Task<ActionResult> AddFriendRequest(Guid differentUserId)
    {
      await _friendRequestService.AddFriendRequest(UserId, differentUserId);
      return NoContent();
    }

    [HttpGet]
    public async Task<ActionResult<FriendRequestInfoResponse>> GetUserFriendRequestInfo()
    {
      return Ok(await _friendRequestService.GetUserFriendRequestInfo(UserId));
    }

    [HttpDelete("{differentUserId}")]
    public async Task<ActionResult> DeleteFriendRequest(Guid differentUserId)
    {
      await _friendRequestService.DeleteFriendRequest(UserId, differentUserId);
      return NoContent();
    }
  }
}
using System;
using System.Threading.Tasks;
using Infrastructure.Signatures;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class AdminRequestController : ParentController
  {
    private readonly IAdminRequestService _adminRequestService;

    public AdminRequestController(IAdminRequestService adminRequestService)
    {
      _adminRequestService = adminRequestService;
    }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpPost("{differentUserId}/{competitionId}")]
    public async Task<ActionResult> AddAdminRequest(Guid differentUserId, Guid competitionId)
    {
      await _adminRequestService.AddAdminRequest(differentUserId, competitionId);
      return NoContent();
    }

    [HttpDelete("{competitionId}")]
    public async Task<ActionResult> DeleteRequestAsUser(Guid competitionId)
    {
      await _adminRequestService.DeleteRequest(UserId, competitionId);
      return NoContent();
    }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpDelete("{differentUserId}/{competitionId}")]
    public async Task<ActionResult> DeleteRequestAsAdmin(Guid differentUserId, Guid competitionId)
    {
      await _adminRequestService.DeleteRequest(differentUserId, competitionId);
      return NoContent();
    }
  }
}
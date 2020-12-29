using System;
using System.Threading.Tasks;
using Infrastructure.Models.Response;
using Infrastructure.Signatures;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class InvitationController : ParentController
  {
    private readonly IInvitationService _invitationService;

    public InvitationController(IInvitationService invitationService)
    {
      _invitationService = invitationService;
    }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpPost("{differentUserId}/{competitionId}")]
    public async Task<ActionResult<CompetitionUserResponse>> AddInvite(Guid differentUserId, Guid competitionId)
    {
      return Ok(await _invitationService.AddInvite(differentUserId, competitionId));
    }

    [HttpDelete("{competitionId}")]
    public async Task<ActionResult> DeleteInviteAsUser(Guid competitionId)
    {
      await _invitationService.DeleteInvite(UserId, competitionId);
      return NoContent();
    }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpDelete("{differentUserId}/{competitionId}")]
    public async Task<ActionResult> DeleteInviteAsAdmin(Guid differentUserId, Guid competitionId)
    {
      await _invitationService.DeleteInvite(differentUserId, competitionId);
      return NoContent();
    }
  }
}
using System;
using System.Threading.Tasks;
using Infrastructure.Models.Response;
using Infrastructure.Signatures;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class ParticipationRequestController : ParentController
  {
    private readonly IParticipationRequestService _participationRequestService;

    public ParticipationRequestController(IParticipationRequestService participationRequestService)
    {
      _participationRequestService = participationRequestService;
    }

    [HttpPost("{competitionId}")]
    public async Task<ActionResult<CompetitionUserResponse>> AddParticipationRequest(Guid competitionId)
    {
      return Ok(await _participationRequestService.AddParticipationRequest(UserId, competitionId));
    }

    [HttpDelete("{competitionId}")]
    public async Task<ActionResult> DeleteParticipationRequestAsUser(Guid competitionId)
    {
      await _participationRequestService.DeleteParticipationRequest(UserId, competitionId);
      return NoContent();
    }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpDelete("{requesterId}/{competitionId}")]
    public async Task<ActionResult> DeleteRequestAsAdmin(Guid requesterId, Guid competitionId)
    {
      await _participationRequestService.DeleteParticipationRequest(requesterId, competitionId);
      return NoContent();
    }
  }
}
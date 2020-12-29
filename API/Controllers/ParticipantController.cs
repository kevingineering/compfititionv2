using System;
using System.Threading.Tasks;
using Infrastructure.Models.Request;
using Infrastructure.Models.Response;
using Infrastructure.Signatures;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class ParticipantController : ParentController
  {
    private readonly IParticipantService _participantService;

    public ParticipantController(IParticipantService participantService)
    {
      _participantService = participantService;
    }

    [HttpPost("{competitionId}")]
    public async Task<ActionResult<ParticipantResponse>> AddParticipantToCompetitionAsUser(Guid competitionId)
    {
      var participant = await _participantService.AddParticipantToCompetitionAsUser(UserId, competitionId);
      return Ok(participant);
    }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpPost("{differentUserId}/{competitionId}")]
    public async Task<ActionResult<ParticipantResponse>> AddParticipantToCompetitionAsAdmin(Guid differentUserId, Guid competitionId)
    {
      var participant = await _participantService.AddParticipantToCompetitionAsAdmin(differentUserId, competitionId);
      return Ok(participant);
    }

    [HttpPatch("ledger")]
    public async Task<ActionResult<ParticipantResponse>> UpdateParticipantLedger(LedgerRequest request)
    {
      var participant = await _participantService.UpdateParticipantLedger(UserId, request);
      return Ok(participant);
    }

    [HttpPatch("target")]
    public async Task<ActionResult<ParticipantResponse>> UpdateParticipantTarget(UpdateParticipantRequest request)
    {
      var participant = await _participantService.UpdateParticipantTarget(UserId, request);
      return Ok(participant);
    }

    [HttpPatch("initialvalue")]
    public async Task<ActionResult<ParticipantResponse>> UpdateParticipantInitialValue(UpdateParticipantRequest request)
    {
      var participant = await _participantService.UpdateParticipantInitialValue(UserId, request);
      return Ok(participant);
    }

    [HttpDelete("{competitionId}")]
    public async Task<ActionResult> RemoveUserFromCompetition(Guid competitionId)
    {
      await _participantService.RemoveUserFromCompetition(UserId, competitionId);
      return NoContent();
    }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpDelete("{differentUserId}/{competitionId}")]
    public async Task<ActionResult> KickUserFromCompetition(Guid differentUserId, Guid competitionId)
    {
      await _participantService.KickUserFromCompetition(differentUserId, competitionId);
      return NoContent();
    }
  }
}
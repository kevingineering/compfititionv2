using System;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs.HelperDTOs;
using API.DTOs.InputDTOs;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications.Admins;
using Core.Specifications.Invites;
using Core.Specifications.ParticipantRequest;
using Core.Specifications.Participants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class ParticipantController : BaseController
  {
    // /participant
    //   POST    /:compid              add participant (as user)
    //   POST    /:userid/:compid      add participant (as admin)
    //   PATCH   /ledger               update ledger for single participant
    //   PATCH   /target               update target for single participant
    //   PATCH   /initialvalue         update initial value for single participant
    //   DELETE  /:compid              delete participant (as user)
    //   DELETE  /:userid/:compid      delete participant (as admin)

    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public ParticipantController(IMapper mapper, IUnitOfWork unitOfWork)
    {
      _unitOfWork = unitOfWork;
      _mapper = mapper;
    }

    [HttpPost("{compId}")]
    public async Task<ActionResult<CompetitionParticipantHelperDTO>> AddParticipantToCompetitionAsUser(Guid compId)
    {
      var userId = GetUserIdFromClaims();

      //verify invite exists
      var inviteSpec = new InviteSpec(userId, compId);
      var invite = await _unitOfWork.Repository<CompetitionInvite>().GetEntityWithSpec(inviteSpec);

      if (invite == null)
      {
        return NotFound(new ApiError(404, "Invite not found."));
      }

      var participant = new CompetitionParticipant(compId, userId);

      //accept and delete invite
      _unitOfWork.Repository<CompetitionInvite>().Delete(invite);
      _unitOfWork.Repository<CompetitionParticipant>().Add(participant);

      var isAdded = await _unitOfWork.Complete();
      if (isAdded <= 0)
      {
        return BadRequest(new ApiError(400, "Error adding participant."));
      }

      return Ok(_mapper.Map<CompetitionParticipant, CompetitionParticipantHelperDTO>(participant));
    }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpPost("{userId}/{compId}")]
    public async Task<ActionResult<CompetitionParticipantHelperDTO>> AddParticipantToCompetitionAsAdmin(Guid userId, Guid compId)
    {
      //verify request exists
      var requestSpec = new ParticipantRequestSpec(userId, compId);
      var request = await _unitOfWork.Repository<CompetitionParticipantRequest>().GetEntityWithSpec(requestSpec);

      if (request == null)
      {
        return NotFound(new ApiError(404, "Request not found."));
      }

      var participant = new CompetitionParticipant(compId, userId);

      //accept and delete request
      _unitOfWork.Repository<CompetitionParticipantRequest>().Delete(request);
      _unitOfWork.Repository<CompetitionParticipant>().Add(participant);

      var isAdded = await _unitOfWork.Complete();
      if (isAdded <= 0)
      {
        return BadRequest(new ApiError(400, "Error adding participant."));
      }

      return Ok(_mapper.Map<CompetitionParticipant, CompetitionParticipantHelperDTO>(participant));
    }

    [HttpPatch("ledger")]
    public async Task<ActionResult<CompetitionParticipantHelperDTO>> UpdateParticipantLedger(LedgerInputDTO ledger)
    {
      var userId = GetUserIdFromClaims();

      //verify user is participant
      var participantSpec = new ParticipantSpec(userId, ledger.Id);
      var participant = await _unitOfWork.Repository<CompetitionParticipant>().GetEntityWithSpec(participantSpec);

      if (participant == null)
      {
        return Unauthorized(new ApiError(404, "User is not in competition."));
      }

      //verify ledger is of correct type
      foreach (var item in ledger.Ledger)
      {
        if (item == null)
        {
          continue;
        }
        if (item.GetType() != typeof(Decimal))
        {
          return BadRequest(new ApiError(400, "Invalid inputs."));
        }
      }

      //update participation
      participant.Ledger = JsonSerializer.Serialize(ledger.Ledger);
      _unitOfWork.Repository<CompetitionParticipant>().Update(participant);
      var isUpdated = await _unitOfWork.Complete();

      if (isUpdated <= 0)
      {
        return BadRequest(new ApiError(400, "Issue updating ledger."));
      }

      return Ok(_mapper.Map<CompetitionParticipant, CompetitionParticipantHelperDTO>(participant));
    }

    [HttpPatch("target")]
    public async Task<ActionResult<CompetitionParticipantHelperDTO>> UpdateParticipantTarget(ParticipantUpdateDTO update)
    {
      var userId = GetUserIdFromClaims();
      var participantSpec = new ParticipantSpec(userId, update.CompId);
      var participant = await _unitOfWork.Repository<CompetitionParticipant>().GetEntityWithSpec(participantSpec);

      if (participant == null)
      {
        return Unauthorized(new ApiError(404, "User is not in competition."));
      }

      //update target
      participant.Target = update.Value;
      _unitOfWork.Repository<CompetitionParticipant>().Update(participant);

      var isUpdated = await _unitOfWork.Complete();

      if (isUpdated <= 0)
      {
        return BadRequest(new ApiError(400, "Issue updating target."));
      }

      return Ok(_mapper.Map<CompetitionParticipant, CompetitionParticipantHelperDTO>(participant));
    }

    [HttpPatch("initialvalue")]
    public async Task<ActionResult<CompetitionParticipantHelperDTO>> UpdateParticipantInitialValue(ParticipantUpdateDTO update)
    {
      var userId = GetUserIdFromClaims();

      //get participant
      var participantSpec = new ParticipantSpec(userId, update.CompId);
      var participant = await _unitOfWork.Repository<CompetitionParticipant>().GetEntityWithSpec(participantSpec);

      if (participant == null)
      {
        return Unauthorized(new ApiError(404, "User is not in competition."));
      }

      //update initial value
      participant.InitialValue = update.Value;
      _unitOfWork.Repository<CompetitionParticipant>().Update(participant);

      var isUpdated = await _unitOfWork.Complete();

      if (isUpdated <= 0)
      {
        return BadRequest(new ApiError(400, "Issue updating start value."));
      }

      return Ok(_mapper.Map<CompetitionParticipant, CompetitionParticipantHelperDTO>(participant));
    }

    [HttpDelete("{compId}")]
    public async Task<ActionResult> RemoveUserFromCompetition(Guid compId)
    {
      var userId = GetUserIdFromClaims();

      //varify user in competition
      var participantSpec = new ParticipantSpec(userId, compId);
      var participant = await _unitOfWork.Repository<CompetitionParticipant>().GetEntityWithSpec(participantSpec);
      if (participant == null)
      {
        return NotFound(new ApiError(404, "You are not in this competition."));
      }

      //admins cannot leave without first appointing a successor
      var adminSpec = new AdminSpec(userId, compId);
      var admin = await _unitOfWork.Repository<CompetitionAdmin>().GetEntityWithSpec(adminSpec);
      if (admin != null)
      {
        return Unauthorized(new ApiError(403, "You are an admin for this competition. You cannot leave this competition without first relinquishing your responsibilities."));
      }

      _unitOfWork.Repository<CompetitionParticipant>().Delete(participant);
      var isDeleted = await _unitOfWork.Complete();

      if (isDeleted <= 0)
      {
        return BadRequest(new ApiError(400, "Error removing participant."));
      }

      return NoContent();
    }

    //TODO - tell user they have been kicked
    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpDelete("{userId}/{compId}")]
    public async Task<ActionResult> KickUserFromCompetition(Guid userId, Guid compId)
    {
      //verify user is participant
      var participantSpec = new ParticipantSpec(userId, compId);
      var participant = await _unitOfWork.Repository<CompetitionParticipant>().GetEntityWithSpec(participantSpec);
      if (participant == null)
      {
        return Unauthorized(new ApiError(404, "User is not in competition."));
      }

      //verify user is not an admin
      var adminSpec = new AdminSpec(userId, compId);
      var admin = await _unitOfWork.Repository<CompetitionAdmin>().GetEntityWithSpec(adminSpec);
      if (admin != null)
      {
        return Unauthorized(new ApiError(403, "You cannot kick out an admin."));
      }

      //delete participation
      _unitOfWork.Repository<CompetitionParticipant>().Delete(participant);
      var isDeleted = await _unitOfWork.Complete();

      if (isDeleted <= 0)
      {
        return BadRequest(new ApiError(400, "Error removing participant."));
      }

      return NoContent();
    }
  }
}
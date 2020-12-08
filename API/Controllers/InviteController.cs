using System;
using System.Threading.Tasks;
using API.DTOs.ReturnDTOs;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications.Invites;
using Core.Specifications.Participants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class InviteController : BaseController
  {
    // /invite
    //   POST    /:userid/:compid      send invite
    //   DELETE  /:compid              delete invite (as user)
    //   DELETE  /:userid/:compid      delete invite (as admin)

    private readonly IGenericService<CompetitionInvite> _inviteService;
    private readonly IGenericService<CompetitionParticipant> _participantService;
    private readonly IMapper _mapper;

    public InviteController(IGenericService<CompetitionInvite> inviteService, IGenericService<CompetitionParticipant> participantService, IMapper mapper)
    {
      _inviteService = inviteService;
      _participantService = participantService;
      _mapper = mapper;
    }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpPost("{userId}/{compId}")]
    public async Task<ActionResult> AddInvite(Guid userId, Guid compId)
    {
      //competition exists if authorization passes

      //verify invite does not exist
      var spec = new InviteSpec(userId, compId);
      var existingInvite = await _inviteService.GetEntityWithSpecAsync(spec);

      if (existingInvite != null)
      {
        return BadRequest(new ApiError(400, "Invite already exists."));
      }

      //verify user not already in competition
      var participantSpec = new ParticipantSpec(userId, compId);
      var participant = await _participantService.GetEntityWithSpecAsync(participantSpec);

      if (participant != null)
      {
        return BadRequest(new ApiError(400, "User is already in competition."));
      }

      //add invite
      var invite = new CompetitionInvite(compId, userId);
      var isAdded = await _inviteService.AddAsync(invite);

      if (isAdded == null)
      {
        return BadRequest(new ApiError(400, "Problem creating invite."));
      }

      return NoContent();
    }

    [HttpDelete("{compId}")]
    public async Task<ActionResult> DeleteInviteAsUser(Guid compId)
    {
      var userId = GetUserIdFromClaims();

      //verify invite exists
      var spec = new InviteSpec(userId, compId);
      var existingInvite = await _inviteService.GetEntityWithSpecAsync(spec);

      if (existingInvite == null)
      {
        return NotFound(new ApiError(404, "Invite not found."));
      }

      //delete invite
      var isDeleted = await _inviteService.DeleteAsync(existingInvite);

      if (!isDeleted)
      {
        return BadRequest(new ApiError(400, "Error removing invite."));
      }

      return NoContent();
    }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpDelete("{userId}/{compId}")]
    public async Task<ActionResult> DeleteInviteAsAdmin(Guid userId, Guid compId)
    {
      //verify invite exists
      var spec = new InviteSpec(userId, compId);
      var existingInvite = await _inviteService.GetEntityWithSpecAsync(spec);

      if (existingInvite == null)
      {
        return NotFound(new ApiError(400, "Invite not found."));
      }

      //delete invite
      var isDeleted = await _inviteService.DeleteAsync(existingInvite);

      if (!isDeleted)
      {
        return BadRequest(new ApiError(400, "Error removing invite."));
      }

      return NoContent();
    }
  }
}
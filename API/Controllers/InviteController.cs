using System;
using System.Threading.Tasks;
using Infrastructure.Models.Response;
using Core.Entity;
using Core.Interfaces;
using Core.Specifications.Invites;
using Core.Specifications.Participants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class InviteController : ParentController
  {
    // /invite
    //   POST    /:userid/:competitionid      send invite
    //   DELETE  /:competitionid              delete invite (as user)
    //   DELETE  /:userid/:competitionid      delete invite (as admin)

    // private readonly IGenericService<CompetitionInvite> _inviteService;
    // private readonly IGenericService<CompetitionParticipant> _participantService;
    // private readonly IMapper _mapper;

    // public InviteController(IGenericService<CompetitionInvite> inviteService, IGenericService<CompetitionParticipant> participantService, IMapper mapper)
    // {
    //   _inviteService = inviteService;
    //   _participantService = participantService;
    //   _mapper = mapper;
    // }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpPost("{userId}/{competitionId}")]
    public Task<ActionResult> AddInvite(Guid userId, Guid competitionId)
    {
      throw new NotImplementedException();

      //competition exists if authorization passes

      //verify invite does not exist
      // var spec = new InviteSpec(userId, competitionId);
      // var existingInvite = await _inviteService.GetEntityWithSpecAsync(spec);

      // if (existingInvite != null)
      // {
      //   return BadRequest(new ApiError(400, "Invite already exists."));
      // }

      // //verify user not already in competition
      // var participantSpec = new ParticipantSpec(userId, competitionId);
      // var participant = await _participantService.GetEntityWithSpecAsync(participantSpec);

      // if (participant != null)
      // {
      //   return BadRequest(new ApiError(400, "User is already in competition."));
      // }

      // //add invite
      // var invite = new CompetitionInvite(userId, competitionId);
      // var isAdded = await _inviteService.AddAsync(invite);

      // if (isAdded == null)
      // {
      //   return BadRequest(new ApiError(400, "Problem creating invite."));
      // }

      // return NoContent();
    }

    [HttpDelete("{competitionId}")]
    public Task<ActionResult> DeleteInviteAsUser(Guid competitionId)
    {
      throw new NotImplementedException();

      // var userId = GetUserIdFromClaims();

      // //verify invite exists
      // var spec = new InviteSpec(userId, competitionId);
      // var existingInvite = await _inviteService.GetEntityWithSpecAsync(spec);

      // if (existingInvite == null)
      // {
      //   return NotFound(new ApiError(404, "Invite not found."));
      // }

      // //delete invite
      // var isDeleted = await _inviteService.DeleteAsync(existingInvite);

      // if (!isDeleted)
      // {
      //   return BadRequest(new ApiError(400, "Error removing invite."));
      // }

      // return NoContent();
    }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpDelete("{userId}/{competitionId}")]
    public Task<ActionResult> DeleteInviteAsAdmin(Guid userId, Guid competitionId)
    {
      throw new NotImplementedException();

      // //verify invite exists
      // var spec = new InviteSpec(userId, competitionId);
      // var existingInvite = await _inviteService.GetEntityWithSpecAsync(spec);

      // if (existingInvite == null)
      // {
      //   return NotFound(new ApiError(400, "Invite not found."));
      // }

      // //delete invite
      // var isDeleted = await _inviteService.DeleteAsync(existingInvite);

      // if (!isDeleted)
      // {
      //   return BadRequest(new ApiError(400, "Error removing invite."));
      // }

      // return NoContent();
    }
  }
}
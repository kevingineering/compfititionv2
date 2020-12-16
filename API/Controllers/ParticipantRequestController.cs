using System;
using System.Threading.Tasks;
using Infrastructure.Models.Response;
using Core.Entity;
using Core.Interfaces;
using Core.Specifications.ParticipantRequest;
using Core.Specifications.Participants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class ParticipantRequestController : ParentController
  {
    // /participantrequest
    //   POST    /:competitionid              add request (as user)
    //   DELETE  /:competitionid              delete request (as admin)
    //   DELETE  /:userid/:competitionid      delete request (as user)

    // private readonly IGenericService<Competition> _competitionService;
    // private readonly IGenericService<CompetitionParticipantRequest> _participantRequestService;
    // private readonly IGenericService<CompetitionParticipant> _participantService;

    // public ParticipantRequestController(IGenericService<CompetitionParticipantRequest> participantRequestService, IGenericService<Competition> competitionService, IGenericService<CompetitionParticipant> participantService)
    // {
    //   _competitionService = competitionService;
    //   _participantRequestService = participantRequestService;
    //   _participantService = participantService;
    // }

    [HttpPost("{competitionId}")]
    public Task<ActionResult> AddRequest(Guid competitionId)
    {
      throw new NotImplementedException();

      // var userId = GetUserIdFromClaims();

      // //verify competition exists
      // var competition = _competitionService.GetByIdAsync(competitionId);

      // if (competition == null)
      // {
      //   return NotFound(new ApiError(404, "Competition not found"));
      // }

      // //verify request doesn't already exist
      // var requestSpec = new ParticipantRequestSpec(userId, competitionId);
      // var existingRequest = await _participantRequestService.GetEntityWithSpecAsync(requestSpec);

      // if (existingRequest != null)
      // {
      //   return BadRequest(new ApiError(400, "Request already exists."));
      // }

      // //verify user not already in competition
      // var participantSpec = new ParticipantSpec(userId, competitionId);
      // var participant = await _participantService.GetEntityWithSpecAsync(participantSpec);

      // if (participant != null)
      // {
      //   return BadRequest(new ApiError(400, "User is already in competition."));
      // }

      // //add request
      // var request = new CompetitionParticipantRequest(userId, competitionId);
      // var isAdded = await _participantRequestService.AddAsync(request);

      // if (isAdded == null)
      // {
      //   return BadRequest(new ApiError(400, "Problem creating request."));
      // }

      // return NoContent();
    }

    [HttpDelete("{competitionId}")]
    public Task<ActionResult> DeleteRequestAsUser(Guid competitionId)
    {
      throw new NotImplementedException();

      // throw new NotImplementedException();

      // var userId = GetUserIdFromClaims();

      // //get request
      // var requestSpec = new ParticipantRequestSpec(userId, competitionId);
      // var existingRequest = await _participantRequestService.GetEntityWithSpecAsync(requestSpec);

      // if (existingRequest == null)
      // {
      //   return NotFound(new ApiError(404, "Request not found"));
      // }

      // //delete request
      // var isDeleted = await _participantRequestService.DeleteAsync(existingRequest);

      // if (!isDeleted)
      // {
      //   return BadRequest(new ApiError(400, "Error removing request."));
      // }

      // return NoContent();
    }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpDelete("{requesterId}/{competitionId}")]
    public Task<ActionResult> DeleteRequestAsAdmin(Guid competitionId, Guid requesterId)
    {
      throw new NotImplementedException();

      // //get request
      // var requestSpec = new ParticipantRequestSpec(requesterId, competitionId);
      // var existingRequest = await _participantRequestService.GetEntityWithSpecAsync(requestSpec);

      // if (existingRequest == null)
      // {
      //   return NotFound(new ApiError(404, "Request not found"));
      // }

      // //delete request
      // var isDeleted = await _participantRequestService.DeleteAsync(existingRequest);

      // if (!isDeleted)
      // {
      //   return BadRequest(new ApiError(400, "Error removing request."));
      // }

      // return NoContent();
    }
  }
}
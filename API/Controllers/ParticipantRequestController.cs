using System;
using System.Threading.Tasks;
using API.DTOs.ReturnDTOs;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications.ParticipantRequest;
using Core.Specifications.Participants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class ParticipantRequestController : BaseController
  {
    // /participantrequest
    //   POST    /:compid              add request (as user)
    //   DELETE  /:compid              delete request (as admin)
    //   DELETE  /:userid/:compid      delete request (as user)

    private readonly IGenericService<CompetitionGoal> _competitionService;
    private readonly IGenericService<CompetitionParticipantRequest> _participantRequestService;
    private readonly IGenericService<CompetitionParticipant> _participantService;
    private readonly IMapper _mapper;

    public ParticipantRequestController(IGenericService<CompetitionParticipantRequest> participantRequestService, IGenericService<CompetitionGoal> competitionService, IGenericService<CompetitionParticipant> participantService, IMapper mapper)
    {
      _competitionService = competitionService;
      _participantRequestService = participantRequestService;
      _participantService = participantService;
      _mapper = mapper;
    }

    [HttpPost("{compId}")]
    public async Task<ActionResult<ParticipantRequestReturnDTO>> AddRequest(Guid compId)
    {
      var userId = GetUserIdFromClaims();

      //verify competition exists
      var competition = _competitionService.GetByIdAsync(compId);

      if (competition == null)
      {
        return NotFound(new ApiError(404, "Competition not found"));
      }

      //verify request doesn't already exist
      var requestSpec = new ParticipantRequestSpec(userId, compId);
      var existingRequest = await _participantRequestService.GetEntityWithSpecAsync(requestSpec);

      if (existingRequest != null)
      {
        return BadRequest(new ApiError(400, "Request already exists."));
      }

      //verify user not already in competition
      var participantSpec = new ParticipantSpec(userId, compId);
      var participant = await _participantService.GetEntityWithSpecAsync(participantSpec);

      if (participant != null)
      {
        return BadRequest(new ApiError(400, "User is already in competition."));
      }

      //add request
      var request = new CompetitionParticipantRequest(compId, userId);
      var isAdded = await _participantRequestService.AddAsync(request);

      if (isAdded == null)
      {
        return BadRequest(new ApiError(400, "Problem creating request."));
      }

      return Ok(_mapper.Map<CompetitionParticipantRequest, ParticipantRequestReturnDTO>(request));
    }

    [HttpDelete("{compId}")]
    public async Task<ActionResult> DeleteRequestAsUser(Guid compId)
    {
      var userId = GetUserIdFromClaims();

      //get request
      var requestSpec = new ParticipantRequestSpec(userId, compId);
      var existingRequest = await _participantRequestService.GetEntityWithSpecAsync(requestSpec);

      if (existingRequest == null)
      {
        return NotFound(new ApiError(404, "Request not found"));
      }

      //delete request
      var isDeleted = await _participantRequestService.DeleteAsync(existingRequest);

      if (!isDeleted)
      {
        return BadRequest(new ApiError(400, "Error removing request."));
      }

      return NoContent();
    }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpDelete("{requesterId}/{compId}")]
    public async Task<ActionResult> DeleteRequestAsAdmin(Guid compId, Guid requesterId)
    {
      //get request
      var requestSpec = new ParticipantRequestSpec(requesterId, compId);
      var existingRequest = await _participantRequestService.GetEntityWithSpecAsync(requestSpec);

      if (existingRequest == null)
      {
        return NotFound(new ApiError(404, "Request not found"));
      }

      //delete request
      var isDeleted = await _participantRequestService.DeleteAsync(existingRequest);

      if (!isDeleted)
      {
        return BadRequest(new ApiError(400, "Error removing request."));
      }

      return NoContent();
    }
  }
}
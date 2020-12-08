using System;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Core.Interfaces;
using AutoMapper;
using API.Errors;
using Microsoft.AspNetCore.Authorization;
using Core.Specifications.Competitions;
using System.Linq;
using API.DTOs.InputDTOs;
using API.DTOs.ReturnDTOs;
using System.Collections.Generic;
using API.DTOs.HelperDTOs;
using Core.Specifications.Users;
using API.Helpers;

namespace API.Controllers
{
  public class CompetitionController : BaseController
  {
    // /competition
    //   POST    /                     add competition                  
    //   GET     /                     get competitions                 
    //   GET     /:compId              get competition                  
    //   PATCH   /:compId              update competition goal   
    //   DELETE  /:compId              delete competition               

    private readonly IMapper _mapper;
    private readonly ICompetitionService _competitionService;
    private readonly IGenericService<User> _userService;

    public CompetitionController(IMapper mapper, ICompetitionService competitionService, IGenericService<User> userService)
    {
      _mapper = mapper;
      _competitionService = competitionService;
      _userService = userService;
    }

    [HttpPost]
    public async Task<ActionResult<CompetitionReturnDTO>> AddCompetition(CompInputDTO input)
    {
      var userId = GetUserIdFromClaims();

      //create competition with user as participant and admin
      var compId = Guid.NewGuid();
      var newComp = _mapper.Map<CompInputDTO, CompetitionGoal>(input);
      newComp.Id = compId;
      var isAdded = await _competitionService.AddCompetitionAsync(newComp, userId);
      if (!isAdded)
      {
        return BadRequest(new ApiError(400, "Problem creating competition."));
      }

      //get and return competition
      //TODO - CompetitionAsAdminSpec
      var spec = new CompetitionAsAdminSpec(compId);
      var competition = await _competitionService.GetEntityWithSpecAsync(spec);
      return Ok(CompetitionMapper.MapCompetition(true, competition, userId));
    }

    [HttpGet]
    public async Task<ActionResult<GoalReturnDTO>> GetCompetitionGoals()
    {
      var userId = GetUserIdFromClaims();
      var goals = await _competitionService.GetUserCompetitionGoals(userId);
      return Ok(_mapper.Map<IReadOnlyList<UserGoal>, IReadOnlyList<GoalReturnDTO>>(goals));
    }

    [HttpGet("{compId}")]
    public async Task<ActionResult<CompetitionReturnDTO>> GetCompetition(Guid compId)
    {
      //TODO - get different levels of information depending on admin level
      //include invites, admin requests, participant requests
      //TODO - CompetitionAsAdminSpec & CompetitionAsUserSpec
      var userId = GetUserIdFromClaims();
      var spec = new CompetitionAsAdminSpec(compId);
      var competition = await _competitionService.GetEntityWithSpecAsync(spec);

      if (competition == null)
      {
        return NotFound(new ApiError(404, "Competition not found."));
      }

      //return forbidden if user is not in competition and competition is private
      if (competition.IsPrivate)
      {
        var userParticipant = competition.Participants.FirstOrDefault(x => x.UserId == userId);
        if (userParticipant == null)
        {
          return Unauthorized(new ApiError(403, "You are not authorized to see this competition."));
        }
      }

      //TODO - START HERE
      //This is hacky, but specification pattern doesn't provide an easy way to .Include().ThenInclude() like EF wants to get second level of data access - could scrap pattern
      // var participantIds = competition.Participants
      //   .Select(x => x.UserId)
      //   .ToList();

      // var participantSpec = new UsersInIdArraySpec(participantIds);
      // var participants = (await _userService.GetListWithSpecAsync(participantSpec))
      //   .Select(x => new { x.Name, x.Id });

      // var participantDTOs = participants
      //   .Join(
      //       competition.Participants,
      //       x => x.Id,
      //       p => p.UserId,
      //       (x, p) => new CompetitionParticipantHelperDTO(p.UserId, x.Name, p.Ledger, p.InitialValue, p.Target))
      //   .ToList();

      // var dto = _mapper.Map<CompetitionGoal, CompetitionReturnDTO>(competition);
      // //sort participants by name
      // dto.Participants = dto.Participants.OrderBy(x => x.Name).ToList();

      var isAdmin = competition.Admins.Any(x => x.UserId == userId);
      return Ok(CompetitionMapper.MapCompetition(isAdmin, competition, userId));
    }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpPatch("{compId}")]
    public async Task<ActionResult<CompetitionReturnDTO>> UpdateCompetitionGoal(Guid compId, CompInputDTO input)
    {
      var userId = GetUserIdFromClaims();

      //competition can't be null or won't pass authorization
      var existingCompetition = await _competitionService.GetByIdAsync(compId);

      _mapper.Map<CompInputDTO, CompetitionGoal>(input, existingCompetition);
      var updatedCompetition = await _competitionService.UpdateAsync(existingCompetition);

      return Ok(CompetitionMapper.MapCompetition(true, updatedCompetition, userId));
    }

    //TODO - tell users that the competition has been deleted
    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpDelete("{compId}")]
    public async Task<ActionResult> DeleteCompetition(Guid compId)
    {
      //competition can't be null or won't pass authorization
      var competition = await _competitionService.GetByIdAsync(compId);
      var isDeleted = await _competitionService.DeleteAsync(competition);
      if (!isDeleted)
      {
        return BadRequest(new ApiError(400, "Error deleting competition."));
      }
      return NoContent();
    }
  }
}
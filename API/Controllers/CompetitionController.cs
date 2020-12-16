using System;
using System.Threading.Tasks;
using Core.Entity;
using Microsoft.AspNetCore.Mvc;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Core.Specifications.Competitions;
using System.Linq;
using Infrastructure.Models.Request;
using Infrastructure.Models.Response;
using System.Collections.Generic;
using Infrastructure.Models.HelperDTOs;
using API.Helpers;

namespace API.Controllers
{
  public class CompetitionController : ParentController
  {
    // /competition
    //   POST    /                     add competition                  
    //   GET     /                     get competitions                 
    //   GET     /:competitionId              get competition                  
    //   PATCH   /:competitionId              update competition goal   
    //   DELETE  /:competitionId              delete competition               

    // private readonly IMapper _mapper;
    // private readonly ICompetitionService _competitionService;
    // private readonly IGenericService<User> _userService;

    // public CompetitionController(IMapper mapper, ICompetitionService competitionService, IGenericService<User> userService)
    // {
    //   _mapper = mapper;
    //   _competitionService = competitionService;
    //   _userService = userService;
    // }

    [HttpPost]
    public Task<ActionResult<CompetitionResponse>> AddCompetition(CompetitionRequest input)
    {
      throw new NotImplementedException();

      // var userId = GetUserIdFromClaims();

      // //TODO 

      // //create competition with user as participant and admin
      // var newComp = _mapper.Map<CompRequest, Competition>(input);
      // newComp.Id = Guid.NewGuid();
      // var isAdded = await _competitionService.AddCompetitionAsync(newComp, userId);
      // if (!isAdded)
      // {
      //   return BadRequest(new ApiError(400, "Problem creating competition."));
      // }

      // //get and return competition
      // //TODO - CompetitionAsAdminSpec
      // var spec = new CompetitionAsAdminSpec(newComp.Id);
      // var competition = await _competitionService.GetEntityWithSpecAsync(spec);
      // return Ok(CompetitionMapper.MapCompetition(true, competition, userId));
    }

    [HttpGet]
    public Task<ActionResult<GoalResponse>> GetCompetitions()
    {
      throw new NotImplementedException();

      // var userId = GetUserIdFromClaims();
      // var goals = await _competitionService.GetUserCompetitions(userId);
      // return Ok(_mapper.Map<IReadOnlyList<Goal>, IReadOnlyList<GoalResponse>>(goals));
    }

    [HttpGet("{competitionId}")]
    public Task<ActionResult<CompetitionResponse>> GetCompetition(Guid competitionId)
    {
      throw new NotImplementedException();

      //TODO - get different levels of information depending on admin level
      //include invites, admin requests, participant requests
      //TODO - CompetitionAsAdminSpec & CompetitionAsUserSpec
      // var userId = GetUserIdFromClaims();
      // var spec = new CompetitionAsAdminSpec(competitionId);
      // var competition = await _competitionService.GetEntityWithSpecAsync(spec);

      // if (competition == null)
      // {
      //   return NotFound(new ApiError(404, "Competition not found."));
      // }

      // //return forbidden if user is not in competition and competition is private
      // if (competition.IsPrivate)
      // {
      //   var userParticipant = competition.Participants.FirstOrDefault(x => x.UserId == userId);
      //   if (userParticipant == null)
      //   {
      //     return Unauthorized(new ApiError(403, "You are not authorized to see this competition."));
      //   }
      // }

      // //This is hacky, but specification pattern doesn't provide an easy way to .Include().ThenInclude() like EF wants to get second level of data access - could scrap pattern
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

      // var isAdmin = competition.Admins.Any(x => x.UserId == userId);
      // return Ok(CompetitionMapper.MapCompetition(isAdmin, competition, userId));
    }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpPatch("{competitionId}")]
    public Task<ActionResult<CompetitionResponse>> UpdateCompetition(Guid competitionId, CompetitionRequest input)
    {
      throw new NotImplementedException();

      // var userId = GetUserIdFromClaims();

      // //competition can't be null or won't pass authorization
      // var existingCompetition = await _competitionService.GetByIdAsync(competitionId);

      // _mapper.Map<CompRequest, Competition>(input, existingCompetition);
      // var updatedCompetition = await _competitionService.UpdateAsync(existingCompetition);

      // return Ok(CompetitionMapper.MapCompetition(true, updatedCompetition, userId));
    }

    //TODO - tell users that the competition has been deleted
    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpDelete("{competitionId}")]
    public Task<ActionResult> DeleteCompetition(Guid competitionId)
    {
      throw new NotImplementedException();

      // //competition can't be null or won't pass authorization
      // var competition = await _competitionService.GetByIdAsync(competitionId);
      // var isDeleted = await _competitionService.DeleteAsync(competition);
      // if (!isDeleted)
      // {
      //   return BadRequest(new ApiError(400, "Error deleting competition."));
      // }
      // return NoContent();
    }
  }
}
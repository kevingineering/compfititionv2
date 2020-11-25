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
using System.Text.Json;
using Core.Specifications.Users;

namespace API.Controllers
{
  public class CompetitionController : BaseController
  {
    // /competition
    //   POST    /                     add competition                  
    //   GET     /                     get competitions                 
    //   GET     /:compId              get competition                  
    //   PATCH   /:compId              update competition goal          
    //   PATCH   /add/:letterId        add user to competition          TODO
    //   PATCH   /remove/:compId       remove user from competition     
    //   PATCH   /kick/:participantId/:compId   kick user from competition
    //   PATCH   /addadmin/:letterId   add admin to competition         TODO
    //   PATCH   /removeadmin/:compId  remove admin from competition
    //   DELETE  /:compId              delete competition               

    //TODO - different pattern? multiple controllers?
    private readonly IMapper _mapper;
    private readonly ICompetitionService _competitionService;
    private readonly IGenericService<CompetitionLetter> _letterService;
    private readonly IGenericService<CompetitionParticipant> _participantService;
    private readonly IGenericService<CompetitionAdmin> _adminService;
    private readonly IGenericService<User> _userService;

    public CompetitionController(IMapper mapper, ICompetitionService competitionService, IGenericService<CompetitionLetter> letterService, IGenericService<CompetitionParticipant> participantService, IGenericService<CompetitionAdmin> adminService, IGenericService<User> userService)
    {
      _mapper = mapper;
      _competitionService = competitionService;
      _letterService = letterService;
      _participantService = participantService;
      _adminService = adminService;
      _userService = userService;
    }

    [HttpPost]
    public async Task<ActionResult<CompetitionReturnDTO>> AddCompetition(GoalOrCompInputDTO input)
    {
      var userId = GetUserIdFromClaims();

      //create competition with user as participant and admin
      var compId = Guid.NewGuid();
      var newComp = _mapper.Map<GoalOrCompInputDTO, CompetitionGoal>(input);
      newComp.Id = compId;
      var isAdded = await _competitionService.AddCompetitionAsync(newComp, userId);
      if (!isAdded)
      {
        return BadRequest(new ApiError(400, "Problem creating competition."));
      }

      //get and return competition
      var spec = new CompetitionWithAdminAndParticipantsSpec(compId);
      var competition = await _competitionService.GetEntityWithSpecAsync(spec);
      return _mapper.Map<CompetitionGoal, CompetitionReturnDTO>(competition);
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
      var userId = GetUserIdFromClaims();
      //TODO - include letters?
      var spec = new CompetitionWithAdminAndParticipantsSpec(compId);
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

      // //TODO - this is hacky - specification pattern doesn't provide an easy way to .Include().ThenInclude() like EF wants to get second level of data access - could scrap pattern
      var participantIds = competition.Participants.Select(x => x.UserId).ToList();
      var participantSpec = new UsersInIdArraySpec(participantIds);
      var participants = (await _userService.GetListWithSpecAsync(participantSpec)).Select(x => new { x.Name, x.Id });
      var participantDTOs = participants.Join(competition.Participants, x => x.Id, p => p.UserId, (x, p) => new CompetitionParticipantHelperDTO(p.UserId, x.Name, p.Ledger, p.InitialValue, p.Target)).ToList();

      var dto = _mapper.Map<CompetitionGoal, CompetitionReturnDTO>(competition);
      //sort participants by name
      dto.Participants = dto.Participants.OrderBy(x => x.Name).ToList();
      return Ok(dto);
    }

    //TODO - tell users competition changed?
    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpPatch("{compId}")]
    public async Task<ActionResult<CompetitionReturnDTO>> UpdateCompetitionGoal(Guid compId, GoalOrCompInputDTO input)
    {
      var spec = new CompetitionWithAdminAndParticipantsSpec(compId);
      var existingCompetition = await _competitionService.GetEntityWithSpecAsync(spec);

      //competition can't be null or won't pass authorization

      _mapper.Map<GoalOrCompInputDTO, CompetitionGoal>(input, existingCompetition);
      var updatedCompetition = await _competitionService.UpdateAsync(existingCompetition);
      return Ok(_mapper.Map<CompetitionGoal, CompetitionReturnDTO>(updatedCompetition));
    }

    //TODO
    //TODO - tell user they have been added if added by admin
    //Letter?
    [HttpPatch("add/{letterId}")]
    public string AddUserToCompetition(Guid letterId)
    {
      //verify letter exists
      var letter = _letterService.GetByIdAsync(letterId);

      //check if user is admin or is user being added
      //verify user not already in competition
      //add user to competition 
      return "user added to competition";
    }

    [HttpPatch("remove/{compId}")]
    public async Task<ActionResult> RemoveUserFromCompetition(Guid compId)
    {
      var userId = GetUserIdFromClaims();
      var participantSpec = new ParticipantWithUserIdAndCompIdSpec(userId, compId);
      var participant = await _participantService.GetEntityWithSpecAsync(participantSpec);
      if (participant == null)
      {
        return NotFound(new ApiError(404, "You are not in this competition."));
      }

      var adminSpec = new AdminWithUserIdAndCompIdSpec(userId, compId);
      var admin = await _adminService.GetEntityWithSpecAsync(adminSpec);
      if (admin != null)
      {
        return Unauthorized(new ApiError(403, "You are an admin for this competition. You cannot leave this competition without first relinquishing your responsibilities."));
      }

      var isDeleted = await _participantService.DeleteAsync(participant);

      if (!isDeleted)
      {
        return BadRequest(new ApiError(400, "Error removing participant."));
      }

      return NoContent();
    }

    [HttpPatch("participant/ledger")]
    public async Task<ActionResult<CompetitionParticipantHelperDTO>> UpdateParticipantLedger(LedgerInputDTO ledger)
    {
      var userId = GetUserIdFromClaims();
      var participantSpec = new ParticipantWithUserIdAndCompIdSpec(userId, ledger.Id);
      var participant = await _participantService.GetEntityWithSpecAsync(participantSpec);

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
      var updatedParticipant = await _participantService.UpdateAsync(participant);
      if (updatedParticipant == null)
      {
        return BadRequest(new ApiError(400, "Issue updating ledger."));
      }

      return Ok(_mapper.Map<CompetitionParticipant, CompetitionParticipantHelperDTO>(updatedParticipant));
    }

    [HttpPatch("participant/target")]
    public async Task<ActionResult<CompetitionParticipantHelperDTO>> UpdateParticipantTarget(ParticipantUpdateDTO update)
    {
      var userId = GetUserIdFromClaims();
      var participantSpec = new ParticipantWithUserIdAndCompIdSpec(userId, update.CompId);
      var participant = await _participantService.GetEntityWithSpecAsync(participantSpec);

      if (participant == null)
      {
        return Unauthorized(new ApiError(404, "User is not in competition."));
      }

      //update participation
      participant.Target = update.Value;
      var updatedParticipant = await _participantService.UpdateAsync(participant);
      if (updatedParticipant == null)
      {
        return BadRequest(new ApiError(400, "Issue updating target."));
      }

      return Ok(_mapper.Map<CompetitionParticipant, CompetitionParticipantHelperDTO>(updatedParticipant));
    }

    [HttpPatch("participant/initialvalue")]
    public async Task<ActionResult<CompetitionParticipantHelperDTO>> UpdateParticipantInitialValue(ParticipantUpdateDTO update)
    {
      var userId = GetUserIdFromClaims();
      var participantSpec = new ParticipantWithUserIdAndCompIdSpec(userId, update.CompId);
      var participant = await _participantService.GetEntityWithSpecAsync(participantSpec);

      if (participant == null)
      {
        return Unauthorized(new ApiError(404, "User is not in competition."));
      }

      //update participation
      participant.InitialValue = update.Value;
      var updatedParticipant = await _participantService.UpdateAsync(participant);
      if (updatedParticipant == null)
      {
        return BadRequest(new ApiError(400, "Issue updating start value."));
      }

      return Ok(_mapper.Map<CompetitionParticipant, CompetitionParticipantHelperDTO>(updatedParticipant));
    }

    //TODO - tell user they have been kicked
    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpPatch("kick/{participantId}/{compId}")]
    public async Task<ActionResult> KickUserFromCompetition(Guid participantId, Guid compId)
    {
      var competition = await _competitionService.GetByIdAsync(compId);

      //competition can't be null or won't pass authorization

      var participantSpec = new ParticipantWithUserIdAndCompIdSpec(participantId, compId);
      var participant = await _participantService.GetEntityWithSpecAsync(participantSpec);
      if (participant == null)
      {
        return Unauthorized(new ApiError(404, "User is not in competition."));
      }

      var adminSpec = new AdminWithUserIdAndCompIdSpec(participantId, compId);
      var admin = await _adminService.GetEntityWithSpecAsync(adminSpec);
      if (admin != null)
      {
        return Unauthorized(new ApiError(403, "You cannot kick out an admin."));
      }

      var isDeleted = await _participantService.DeleteAsync(participant);

      if (!isDeleted)
      {
        return BadRequest(new ApiError(400, "Error removing participant."));
      }

      return NoContent();
    }

    //TODO
    //Letter?
    [HttpPatch("addadmin/{letterId}")]
    public string AddAdminToCompetition(Guid letterId)
    {
      return "admin added to competition";
    }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpPatch("removeadmin/{compId}")]
    public async Task<ActionResult> RemoveAdminFromCompetition(Guid compId)
    {
      var userId = GetUserIdFromClaims();

      var adminsSpec = new AdminsWithCompIdSpec(compId);
      var admins = await _adminService.GetListWithSpecAsync(adminsSpec);

      //TODO - can user send request, then delete their admin status, and force user who was asked to be admin?

      if (admins.Count == 1)
      {
        return Unauthorized(new ApiError(403, "You are the only admin in this competition. Ask someone else to be an admin before relinquishing your responsibilitites."));
      }

      var admin = admins.First(x => x.UserId == userId);

      var isDeleted = await _adminService.DeleteAsync(admin);

      if (!isDeleted)
      {
        return BadRequest(new ApiError(400, "Error removing participant."));
      }

      return NoContent();
    }

    //TODO - tell users that the competition has been deleted
    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpDelete("{compId}")]
    public async Task<ActionResult> DeleteCompetition(Guid compId)
    {
      var spec = new CompetitionWithAdminAndParticipantsSpec(compId);
      var competition = await _competitionService.GetEntityWithSpecAsync(spec);
      var isDeleted = await _competitionService.DeleteAsync(competition);
      if (!isDeleted)
      {
        return BadRequest(new ApiError(400, "Error deleting competition."));
      }
      return NoContent();
    }
  }
}
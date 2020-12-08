using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using API.Errors;
using Microsoft.AspNetCore.Http;
using API.DTOs.InputDTOs;
using API.DTOs.ReturnDTOs;
using AutoMapper;
using Core.Specifications.Goals;
using System.Text.Json;

namespace API.Controllers
{
  public class GoalController : BaseController
  {
    // /goal
    //   POST    /                   add goal
    //   GET     /                   user goals
    //   GET     /:goalId            user goal
    //   PATCH   /:goalId            update goal
    //   PATCH   /ledger             update ledger
    //   DELETE  /:goalId            delete goal

    private readonly IGenericService<UserGoal> _goalService;
    private readonly IMapper _mapper;

    public GoalController(IGenericService<UserGoal> goalService, IMapper mapper)
    {
      _goalService = goalService;
      _mapper = mapper;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<GoalReturnDTO>> AddGoal(GoalInputDTO goalInput)
    {
      //create goal
      var newGoal = _mapper.Map<GoalInputDTO, UserGoal>(goalInput);
      newGoal.UserId = GetUserIdFromClaims();
      newGoal.Ledger = null;

      //add goal
      var goal = await _goalService.AddAsync(newGoal);
      if (goal == null)
      {
        return BadRequest(new ApiError(400, "Problem creating goal."));
      }

      return Ok(_mapper.Map<UserGoal, GoalReturnDTO>(goal));
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IReadOnlyList<GoalReturnDTO>>> GetGoalsByUserId()
    {
      var userId = GetUserIdFromClaims();
      var spec = new UserGoalsSpec(userId);
      var goals = await _goalService.GetListWithSpecAsync(spec);
      return Ok(_mapper.Map<IReadOnlyList<UserGoal>, IReadOnlyList<GoalReturnDTO>>(goals));
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<GoalReturnDTO>> GetGoalById(Guid id)
    {
      //get goal
      var goal = await _goalService.GetByIdAsync(id);
      if (goal == null)
      {
        return NotFound(new ApiError(404));
      }

      //verify user owns goal
      var userId = GetUserIdFromClaims();
      if (goal.UserId != userId && goal.IsPrivate)
      {
        return Unauthorized(new ApiError(403, "You are not authorized to see this goal"));
      }

      return Ok(_mapper.Map<UserGoal, GoalReturnDTO>(goal));
    }

    [HttpPatch("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<GoalReturnDTO>> UpdateGoal(Guid id, GoalInputDTO goalInput)
    {
      //get goal
      var existingGoal = await _goalService.GetByIdAsync(id);
      if (existingGoal == null)
      {
        return NotFound(new ApiError(404, "Goal not found."));
      }

      //ensure user owns goal
      var userId = GetUserIdFromClaims();
      if (userId != existingGoal.UserId)
      {
        return Unauthorized(new ApiError(403, "You are not authorized to update this goal."));
      }

      //update goal
      _mapper.Map<GoalInputDTO, UserGoal>(goalInput, existingGoal);
      var updatedGoal = await _goalService.UpdateAsync(existingGoal);
      if (updatedGoal == null)
      {
        return BadRequest(new ApiError(400, "Issue updating goal."));
      }

      return Ok(_mapper.Map<UserGoal, GoalReturnDTO>(updatedGoal));
    }

    [HttpPatch("ledger")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<GoalReturnDTO>> UpdateGoalLedger(LedgerInputDTO ledger)
    {
      //get goal
      var existingGoal = await _goalService.GetByIdAsync(ledger.Id);
      if (existingGoal == null)
      {
        return NotFound(new ApiError(404, "Goal not found."));
      }

      //ensure user owns goal
      var userId = GetUserIdFromClaims();
      if (userId != existingGoal.UserId)
      {
        return Unauthorized(new ApiError(403, "You are not authorized to modify this goal."));
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

      //update goal
      existingGoal.Ledger = JsonSerializer.Serialize(ledger.Ledger);
      var updatedGoal = await _goalService.UpdateAsync(existingGoal);
      if (updatedGoal == null)
      {
        return BadRequest(new ApiError(400, "Issue updating goal."));
      }

      return Ok(_mapper.Map<UserGoal, GoalReturnDTO>(updatedGoal));
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UserGoal>> DeleteGoalByGoalId(Guid id)
    {
      //get goal
      var goal = await _goalService.GetByIdAsync(id);
      if (goal == null)
      {
        return NotFound(new ApiError(404, "Goal not found."));
      }

      //ensure user owns goal      
      var userId = GetUserIdFromClaims();
      if (userId != goal.UserId)
      {
        return Unauthorized(new ApiError(403, "You are not authorized to delete this goal."));
      }

      //delete goal
      var isDeleted = await _goalService.DeleteAsync(goal);
      if (!isDeleted)
      {
        return BadRequest(new ApiError(400, "Error deleting goal."));
      }
      return Ok();
    }
  }
}
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using API.Errors;
using Microsoft.AspNetCore.Http;
using API.DTOs.GoalDTOs;
using AutoMapper;
using Core.Specifications.Goals;

namespace API.Controllers
{
  public class GoalsController : BaseController
  {
    // /goals
    //   POST    /                   add goal
    //   GET     /                   user goals
    //   GET     /:goalId            user goal
    //   PATCH   /:goalId            update goal
    //   PATCH   /tracker            update tracker
    //   DELETE  /:goalId            delete goal

    private readonly IGenericService<Goal> _goalService;
    private readonly IMapper _mapper;

    public GoalsController(IGenericService<Goal> goalService, IMapper mapper)
    {
      _goalService = goalService;
      _mapper = mapper;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IReadOnlyList<GoalReturnDTO>>> GetGoalsByUserId()
    {
      var userId = GetUserIdFromClaims();
      var spec = new GoalsWithUserIdSpec(userId);
      var goals = await _goalService.GetListWithSpecAsync(spec);
      return Ok(_mapper.Map<IReadOnlyList<Goal>, IReadOnlyList<GoalReturnDTO>>(goals));
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

      return Ok(_mapper.Map<Goal, GoalReturnDTO>(goal));
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<GoalReturnDTO>> AddGoal(GoalInputDTO goalInput)
    {
      //create goal
      var newGoal = _mapper.Map<GoalInputDTO, Goal>(goalInput);
      newGoal.UserId = GetUserIdFromClaims();
      newGoal.Tracker = "";

      //add goal
      var goal = await _goalService.AddAsync(newGoal);
      if (goal == null)
      {
        return BadRequest(new ApiError(400, "Problem creating goal."));
      }

      return Ok(_mapper.Map<Goal, GoalReturnDTO>(goal));
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
      _mapper.Map<GoalInputDTO, Goal>(goalInput, existingGoal);
      var updatedGoal = await _goalService.UpdateAsync(existingGoal);
      if (updatedGoal == null)
      {
        return BadRequest(new ApiError(400, "Issue updating goal."));
      }

      return Ok(_mapper.Map<Goal, GoalReturnDTO>(updatedGoal));
    }

    [HttpPatch("tracker")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<GoalReturnDTO>> UpdateGoalTracker(TrackerDTO trackerDTO)
    {
      //get goal
      var existingGoal = await _goalService.GetByIdAsync(trackerDTO.Id);
      if (existingGoal == null)
      {
        return NotFound(new ApiError(404, "Goal not found."));
      }

      //TODO - verify tracker is of correct type

      //ensure user owns goal
      var userId = GetUserIdFromClaims();
      if (userId != existingGoal.UserId)
      {
        return Unauthorized(new ApiError(403, "You are not authorized to modify this goal."));
      }

      //update goal
      existingGoal.Tracker = trackerDTO.Tracker;
      var updatedGoal = await _goalService.UpdateAsync(existingGoal);
      if (updatedGoal == null)
      {
        return BadRequest(new ApiError(400, "Issue updating goal."));
      }

      return Ok(_mapper.Map<Goal, GoalReturnDTO>(updatedGoal));
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Goal>> DeleteGoalByGoalId(Guid id)
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

      var result = await _goalService.DeleteAsync(goal);
      if (!result)
      {
        return BadRequest(new ApiError(400, "Error deleting goal."));
      }
      return Ok();
    }
  }
}
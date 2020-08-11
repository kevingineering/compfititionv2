using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Infrastructure.Data;
using API.Errors;
using Microsoft.AspNetCore.Http;
using Core.Specifications;
using API.DTOs;
using AutoMapper;

namespace API.Controllers
{
  public class GoalsController : BaseController
  {
    private readonly IGoalService _goalService;
    private readonly IMapper _mapper;

    public GoalsController(DataContext context, IGoalService goalService, IMapper mapper)
    {
      _mapper = mapper;
      _goalService = goalService;
    }

    //CREATE

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<GoalReturnDTO>> AddGoal(GoalInputDTO goalInput)
    {
      //TODO - get user from token
      var userId = new Guid("65fe1074-d2ce-454b-9bd4-b61a8db31021");
      //HttpContext.User.RetrieveUserIdFromPrincipal();

      //TODO - create tracker
      var tracker = "TODO";

      var newGoal = _mapper.Map<GoalInputDTO, Goal>(goalInput);
      newGoal.UserId = userId;
      newGoal.Tracker = tracker;

      var goal = await _goalService.CreateGoalAsync(newGoal);

      if (goal == null)
      {
        return BadRequest(new ApiError(400, "Problem creating goal."));
      }

      return Ok(_mapper.Map<Goal, GoalReturnDTO>(goal));
    }

    //READ

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<GoalReturnDTO>> GetGoalById(Guid id)
    {
      var goal = await _goalService.GetGoalAsync(id);
      if (goal == null)
      {
        return NotFound(new ApiError(404));
      }

      return Ok(_mapper.Map<Goal, GoalReturnDTO>(goal));
    }

    [HttpGet("user")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IReadOnlyList<GoalReturnDTO>>> GetGoalsByUserId()
    {
      //Note: if user doesn't exist, they won't pass authentication
      //TODO - get user from token
      var id = new Guid("65fe1074-d2ce-454b-9bd4-b61a8db31021");
      var goals = await _goalService.GetGoalsByUserIdAsync(id);
      return Ok(_mapper.Map<IReadOnlyList<Goal>, IReadOnlyList<GoalReturnDTO>>(goals));
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IReadOnlyList<Goal>>> GetGoals()
    {
      var goals = await _goalService.GetAllGoalsAsync();
      return Ok(_mapper.Map<IReadOnlyList<Goal>, IReadOnlyList<GoalReturnDTO>>(goals));
    }

    //UPDATE

    [HttpPatch("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<GoalReturnDTO>> UpdateGoal(Guid id, GoalInputDTO goalInput)
    {
      var existingGoal = await _goalService.GetGoalAsync(id);
      if (existingGoal == null)
      {
        return NotFound(new ApiError(404, "Goal not found."));
      }

      _mapper.Map<GoalInputDTO, Goal>(goalInput, existingGoal);

      var updatedGoal = await _goalService.UpdateGoalAsync(existingGoal);
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
      var existingGoal = await _goalService.GetGoalAsync(trackerDTO.Id);
      if (existingGoal == null)
      {
        return NotFound(new ApiError(404, "Goal not found."));
      }
      existingGoal.Tracker = trackerDTO.Tracker;
      var updatedGoal = await _goalService.UpdateGoalAsync(existingGoal);
      if (updatedGoal == null)
      {
        return BadRequest(new ApiError(400, "Issue updating goal."));
      }

      return Ok(_mapper.Map<Goal, GoalReturnDTO>(updatedGoal));
    }

    //DELETE

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Goal>> DeleteGoalByGoalId(Guid id)
    {
      //TODO - verify user owns goal
      var goal = await _goalService.GetGoalAsync(id);
      if (goal == null)
      {
        return NotFound(new ApiError(404, "Goal not found."));
      }

      var result = await _goalService.DeleteGoalAsync(goal);
      if (!result)
      {
        return BadRequest(new ApiError(400, "Error deleting goal."));
      }
      return Ok();
    }
  }
}
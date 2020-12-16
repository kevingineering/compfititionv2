using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entity;
using Microsoft.AspNetCore.Mvc;
using Infrastructure.Models.Request;
using Infrastructure.Models.Response;
using Infrastructure.Signatures;

namespace API.Controllers
{
  public class GoalController : ParentController
  {
    private readonly IGoalService _goalService;

    public GoalController(IGoalService goalService)
    {
      _goalService = goalService;
    }

    [HttpPost]
    public async Task<ActionResult<GoalResponse>> AddGoal(GoalRequest request)
    {
      return Ok(await _goalService.AddGoal(UserId, request));
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<GoalResponse>>> GetGoals()
    {
      return Ok(await _goalService.GetUserGoals(UserId));
    }

    [HttpGet("{goalId}")]
    public async Task<ActionResult<GoalResponse>> GetGoal(Guid goalId)
    {
      return Ok(await _goalService.GetGoal(UserId, goalId));
    }

    [HttpPatch("{goalId}")]
    public async Task<ActionResult<GoalResponse>> UpdateGoal(Guid goalId, GoalRequest request)
    {
      return Ok(await _goalService.UpdateGoal(UserId, goalId, request));
    }

    [HttpPatch("ledger")]
    public async Task<ActionResult<GoalResponse>> UpdateGoalLedger(LedgerRequest request)
    {
      return Ok(await _goalService.UpdateGoalLedger(UserId, request));
    }

    [HttpDelete("{goalId}")]
    public async Task<ActionResult<Goal>> DeleteGoal(Guid goalId)
    {
      await _goalService.DeleteGoal(UserId, goalId);
      return NoContent();
    }
  }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entity;
using Core.Interfaces.Repos;
using Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Data.Repos
{
  public class GoalRepo : BaseRepo, IGoalRepo
  {
    public GoalRepo(DataContext context) : base(context)
    {

    }

    public async Task<IEnumerable<Goal>> GetUserGoals(Guid userId)
    {
      return await _context.Goals
        .Where(x => x.UserId == userId)
        .Include(x => x.Challenge)
        .OrderBy(x => x.Challenge.StartTime)
        .ToListAsync();
    }

    public async Task<Goal> GetGoal(Guid goalId)
    {
      return await _context.Goals
        .Include(x => x.Challenge)
        .FirstOrDefaultAsync(x => x.GoalId == goalId);
    }

    public void AddGoal(Goal goal)
    {
      _context.Goals.Add(goal);
    }

    public void UpdateGoal(Goal goal)
    {
      _context.Goals.Attach(goal);
      _context.Entry(goal).State = EntityState.Modified;
    }

    public void DeleteGoal(Goal goal)
    {
      _context.Goals.Remove(goal);
    }
  }
}
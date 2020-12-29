using System;
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

    public async Task<Goal> Get(Guid goalId)
    {
      return await _context.Goals
        .Include(x => x.Challenge)
        .FirstOrDefaultAsync(x => x.GoalId == goalId);
    }

    public void Create(Goal goal)
    {
      _context.Goals.Add(goal);
    }

    public void Update(Goal goal)
    {
      _context.Goals.Attach(goal);
      _context.Entry(goal).State = EntityState.Modified;
    }

    public void Delete(Goal goal)
    {
      // _context.Goals.Remove(goal);
      var existing = _context.Goals.Find(goal.GoalId);
      _context.Goals.Remove(existing);
    }

    //TODO - alternative way to delete goal entities without fetching them first?
    // public void Delete(Guid userId, Guid goalId)
    // {
    //   var goal = new Goal { GoalId = goalId, UserId = userId };
    //   _context.Entry(goal).State = EntityState.Deleted;
    //   // var existing = _context.Goals.FirstOrDefault(x => x.UserId == userId && x.GoalId == goalId);
    //   // _context.Goals.Remove(existing);
    // }
  }
}
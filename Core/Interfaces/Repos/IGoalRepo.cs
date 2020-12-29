using System;
using System.Threading.Tasks;
using Core.Entity;

namespace Core.Interfaces.Repos
{
  public interface IGoalRepo : IBaseRepo
  {
    Task<Goal> Get(Guid goalId);
    void Create(Goal goal);
    void Update(Goal goal);
    void Delete(Goal goal);
    // void Delete(Guid userId, Guid goalId);
  }
}
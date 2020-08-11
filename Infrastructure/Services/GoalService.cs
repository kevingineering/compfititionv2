using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.Services
{
  public class GoalService : IGoalService
  {
    private readonly IUnitOfWork _unitOfWork;

    public GoalService(IUnitOfWork unitOfWork)
    {
      _unitOfWork = unitOfWork;
    }

    public async Task<Goal> CreateGoalAsync(Goal goal)
    {
      _unitOfWork.Repository<Goal>().Add(goal);

      var result = await _unitOfWork.Complete();

      if (result <= 0)
      {
        return null;
      }

      //TODO - does this return new goal with ID? 
      return goal;
    }

    public async Task<Goal> GetGoalAsync(Guid id)
    {
      return await _unitOfWork.Repository<Goal>().GetByIdAsync(id);
    }

    public async Task<IReadOnlyList<Goal>> GetGoalsByUserIdAsync(Guid id)
    {
      var spec = new GoalsWithUserIdSpec(id);
      return await _unitOfWork.Repository<Goal>().ListAsync(spec);
    }

    public async Task<IReadOnlyList<Goal>> GetAllGoalsAsync()
    {
      return await _unitOfWork.Repository<Goal>().ListAllAsync();
    }

    public async Task<Goal> UpdateGoalAsync(Goal goal)
    {
      _unitOfWork.Repository<Goal>().Update(goal);
      var result = await _unitOfWork.Complete();
      if (result <= 0)
      {
        return null;
      }
      return goal;
    }

    public async Task<bool> DeleteGoalAsync(Goal goal)
    {
      _unitOfWork.Repository<Goal>().Delete(goal);
      var result = await _unitOfWork.Complete();
      if (result <= 0)
      {
        return false;
      }
      return true;
    }
  }
}
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;

//this class is inherited by all other entity services
//it provideds operations for simple database reads, updates, and deletes
//create is not included here as we don't want it to be provided to entities which have more complicated creates
//initially created services for goals and users, but quickly found repeated code
//still need services for operations that require _unitOfWork.Complete() to wait for multiple instructions

namespace Infrastructure.Services
{
  public abstract class AbstractService<T> where T : BaseEntity
  {
    private readonly IUnitOfWork _unitOfWork;

    public AbstractService(IUnitOfWork unitOfWork)
    {
      _unitOfWork = unitOfWork;
    }

    //READ
    public async Task<T> GetByIdAsync(Guid id)
    {
      return await _unitOfWork.Repository<T>().GetByIdAsync(id);
    }

    public async Task<T> GetEntityWithSpecAsync(ISpecification<T> spec)
    {
      return await _unitOfWork.Repository<T>().GetEntityWithSpec(spec);
    }

    public async Task<IReadOnlyList<T>> GetListWithSpecAsync(ISpecification<T> spec)
    {
      return await _unitOfWork.Repository<T>().ListAsync(spec);
    }

    //UPDATE
    public async Task<T> UpdateAsync(T t)
    {
      _unitOfWork.Repository<T>().Update(t);
      var changes = await _unitOfWork.Complete();
      if (changes <= 0)
      {
        return null;
      }

      return t;
    }

    //DELETE
    public async Task<bool> DeleteAsync(T t)
    {
      _unitOfWork.Repository<T>().Delete(t);
      var changes = await _unitOfWork.Complete();
      if (changes <= 0)
      {
        return false;
      }
      return true;
    }
  }
}
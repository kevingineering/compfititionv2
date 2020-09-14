using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces
{
  public interface IGenericService<T> where T : BaseEntity
  {
    //CREATE 
    Task<T> AddAsync(T t);

    //READ
    Task<T> GetByIdAsync(Guid id);
    Task<T> GetEntityWithSpecAsync(ISpecification<T> spec);
    Task<IReadOnlyList<T>> GetListWithSpecAsync(ISpecification<T> spec);

    //UPDATE
    Task<T> UpdateAsync(T t);

    //DELETE
    Task<bool> DeleteAsync(T t);
  }
}
using System;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
  public interface IUnitOfWork : IDisposable
  {
    //returns repo
    IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity;

    //call at end, returns number of changes
    Task<int> Complete();
  }
}
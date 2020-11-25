using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
  public interface IGenericService<T> : IAbstractService<T> where T : BaseEntity
  {
    //CREATE 
    Task<T> AddAsync(T t);
  }
}
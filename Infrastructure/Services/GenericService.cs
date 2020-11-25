using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;

//this class is for simple entities which can use a simple add command - contrast with add required for competitions
//initially created generic services for goals and users, but quickly found repeated code
//later split into AbstractService and GenericService
//still need services for operations that require _unitOfWork.Complete() to wait for multiple instructions

namespace Infrastructure.Services
{
  public class GenericService<T> : AbstractService<T>, IGenericService<T> where T : BaseEntity
  {
    private readonly IUnitOfWork _unitOfWork;

    public GenericService(IUnitOfWork unitOfWork) : base(unitOfWork)
    {
      _unitOfWork = unitOfWork;
    }

    //CREATE
    public virtual async Task<T> AddAsync(T t)
    {
      _unitOfWork.Repository<T>().Add(t);
      var changes = await _unitOfWork.Complete();
      if (changes <= 0)
      {
        return null;
      }

      return t;
    }
  }
}
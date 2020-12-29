using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entity;

namespace Core.Interfaces.Repos
{
  public interface IAdminRepo : IBaseRepo
  {
    Task<Admin> Get(Guid userId, Guid competitionId);
    Task<IEnumerable<Admin>> GetList(Guid competitionId);
    void Create(Admin admin);
    void Delete(Admin admin);
  }
}
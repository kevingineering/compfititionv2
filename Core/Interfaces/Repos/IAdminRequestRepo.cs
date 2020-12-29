using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entity;

namespace Core.Interfaces.Repos
{
  public interface IAdminRequestRepo : IBaseRepo
  {
    Task<AdminRequest> Get(Guid userId, Guid competitionId);
    Task<IEnumerable<AdminRequest>> GetList(Guid competitionId);
    void Create(AdminRequest adminRequest);
    void Delete(AdminRequest adminRequest);
  }
}
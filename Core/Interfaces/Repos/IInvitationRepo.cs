using System;
using System.Threading.Tasks;
using Core.Entity;

namespace Core.Interfaces.Repos
{
  public interface IInvitationRepo : IBaseRepo
  {
    Task<Invitation> Get(Guid userId, Guid competitionId);
    void Create(Invitation invitation);
    void Delete(Invitation invitation);
  }
}
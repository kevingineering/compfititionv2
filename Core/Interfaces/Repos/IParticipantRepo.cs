using System;
using System.Threading.Tasks;
using Core.Entity;

namespace Core.Interfaces.Repos
{
  public interface IParticipantRepo : IBaseRepo
  {
    Task<Participant> Get(Guid userId, Guid competitionId);
    void Create(Participant participant);
    void Update(Participant participant);
    void Delete(Participant participant);
  }
}
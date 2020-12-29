using System;
using System.Threading.Tasks;
using Core.Entity;

namespace Core.Interfaces.Repos
{
  public interface IParticipationRequestRepo : IBaseRepo
  {
    Task<ParticipationRequest> Get(Guid userId, Guid competitionId);
    void Create(ParticipationRequest participationRequest);
    void Delete(ParticipationRequest participationRequest);
  }
}
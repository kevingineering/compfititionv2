using System;
using System.Threading.Tasks;
using Core.Entity;

namespace Core.Interfaces.Repos
{
  public interface ICompetitionRepo : IBaseRepo
  {
    Task<Competition> Get(Guid competitionId);
    Task<Competition> GetWithInfo(Guid competitionId);
    void Create(Competition competition);
    void Update(Competition competition);
    void Delete(Competition competition);
  }
}
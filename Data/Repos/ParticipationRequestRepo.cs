using System;
using System.Threading.Tasks;
using Core.Entity;
using Core.Interfaces.Repos;
using Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Data.Repos
{
  public class ParticipationRequestRepo : BaseRepo, IParticipationRequestRepo
  {
    public ParticipationRequestRepo(DataContext context) : base(context)
    {

    }

    public async Task<ParticipationRequest> Get(Guid userId, Guid competitionId)
    {
      return await _context.ParticipationRequests
        .FirstOrDefaultAsync(x => x.UserId == userId && x.CompetitionId == competitionId);
    }

    public void Create(ParticipationRequest participationRequest)
    {
      _context.ParticipationRequests.Add(participationRequest);
    }

    public void Delete(ParticipationRequest participationRequest)
    {
      _context.ParticipationRequests.Remove(participationRequest);
    }
  }
}
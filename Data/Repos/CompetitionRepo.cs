using System;
using System.Threading.Tasks;
using Core.Entity;
using Core.Interfaces.Repos;
using Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Data.Repos
{
  public class CompetitionRepo : BaseRepo, ICompetitionRepo
  {
    public CompetitionRepo(DataContext context) : base(context)
    {

    }

    public async Task<Competition> Get(Guid competitionId)
    {
      return await _context.Competitions
        .Include(x => x.Challenge)
        .FirstOrDefaultAsync(x => x.CompetitionId == competitionId);
    }

    public async Task<Competition> GetWithInfo(Guid competitionId)
    {
      return await _context.Competitions
        .Include(x => x.Challenge)
        .Include(x => x.Participants)
          .ThenInclude(x => x.User)
        .Include(x => x.ParticipationRequests)
          .ThenInclude(x => x.User)
        .Include(x => x.Invitations)
          .ThenInclude(x => x.User)
        .Include(x => x.Admins)
        .Include(x => x.AdminRequests)
        .FirstOrDefaultAsync(x => x.CompetitionId == competitionId);
    }

    public void Create(Competition competition)
    {
      _context.Add(competition);
    }

    public void Update(Competition competition)
    {
      _context.Attach(competition);
      _context.Entry(competition).State = EntityState.Modified;
    }

    public void Delete(Competition competition)
    {
      _context.Remove(competition);
    }
  }
}
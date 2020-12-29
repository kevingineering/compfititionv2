using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entity;
using Core.Interfaces.Repos;
using Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Data.Repos
{
  public class ParticipantRepo : BaseRepo, IParticipantRepo
  {
    public ParticipantRepo(DataContext context) : base(context)
    {

    }

    public async Task<Participant> Get(Guid userId, Guid competitionId)
    {
      return await _context.Participants
      .FirstOrDefaultAsync(x => x.UserId == userId && x.CompetitionId == competitionId);
    }

    public void Create(Participant participant)
    {
      _context.Participants.Add(participant);
    }

    public void Update(Participant participant)
    {
      _context.Participants.Attach(participant);
      _context.Entry(participant).State = EntityState.Modified;
    }

    public void Delete(Participant participant)
    {
      _context.Participants.Remove(participant);
    }
  }
}
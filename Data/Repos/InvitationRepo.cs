using System;
using System.Threading.Tasks;
using Core.Entity;
using Core.Interfaces.Repos;
using Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Data.Repos
{
  public class InvitationRepo : BaseRepo, IInvitationRepo
  {
    public InvitationRepo(DataContext context) : base(context)
    {

    }

    public async Task<Invitation> Get(Guid userId, Guid competitionId)
    {
      return await _context.Invitations
        .FirstOrDefaultAsync(x => x.UserId == userId && x.CompetitionId == competitionId);
    }

    public void Create(Invitation invitation)
    {
      _context.Invitations.Add(invitation);
    }

    public void Delete(Invitation invitation)
    {
      _context.Invitations.Remove(invitation);
    }
  }
}
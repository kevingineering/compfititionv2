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
  public class AdminRepo : BaseRepo, IAdminRepo
  {
    public AdminRepo(DataContext context) : base(context)
    {

    }

    public async Task<Admin> Get(Guid userId, Guid competitionId)
    {
      return await _context.Admins
        .FirstOrDefaultAsync(x => x.UserId == userId && x.CompetitionId == competitionId);
    }

    public async Task<IEnumerable<Admin>> GetList(Guid competitionId)
    {
      return await _context.Admins
        .Where(x => x.CompetitionId == competitionId)
        .ToListAsync();
    }

    public void Create(Admin admin)
    {
      _context.Admins.Add(admin);
    }

    public void Delete(Admin admin)
    {
      _context.Admins.Remove(admin);
    }
  }
}
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
  public class AdminRequestRepo : BaseRepo, IAdminRequestRepo
  {
    public AdminRequestRepo(DataContext context) : base(context)
    {

    }

    public async Task<AdminRequest> Get(Guid userId, Guid competitionId)
    {
      return await _context.AdminRequests
        .FirstOrDefaultAsync(x => x.UserId == userId && x.CompetitionId == competitionId);
    }

    public async Task<IEnumerable<AdminRequest>> GetList(Guid competitionId)
    {
      return await _context.AdminRequests
        .Where(x => x.CompetitionId == competitionId)
        .ToListAsync();
    }

    public void Create(AdminRequest adminRequest)
    {
      _context.AdminRequests.Add(adminRequest);
    }

    public void Delete(AdminRequest adminRequest)
    {
      _context.AdminRequests.Remove(adminRequest);
    }
  }
}
using System;
using System.Threading.Tasks;
using Core.Errors;
using Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Data.Repos
{
  public class BaseRepo
  {
    protected internal readonly DataContext _context;

    public BaseRepo(DataContext context)
    {
      _context = context;
    }

    public async Task Save(string message = null)
    {
      try
      {
        var changes = await _context.SaveChangesAsync();
        if (changes <= 0)
        {
          throw new ApiError(500, "Error saving changes.");
        }
      }
      catch (DbUpdateConcurrencyException)
      {
        throw new ApiError(400, "You are working with old data, please refresh.");
      }
      catch (Exception)
      {
        throw new ApiError(500, message ?? "Error saving changes.");
      }
    }
  }
}
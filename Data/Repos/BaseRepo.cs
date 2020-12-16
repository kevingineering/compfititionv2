using System.Threading.Tasks;
using Data.Context;

namespace Data.Repos
{
  public class BaseRepo
  {
    protected internal readonly DataContext _context;

    public BaseRepo(DataContext context)
    {
      _context = context;
    }

    public async Task<int> Save()
    {
      return await _context.SaveChangesAsync();
    }
  }
}
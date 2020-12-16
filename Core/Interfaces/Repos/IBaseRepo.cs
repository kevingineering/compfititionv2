using System.Threading.Tasks;

namespace Core.Interfaces.Repos
{
  public interface IBaseRepo
  {
    Task<int> Save();
  }
}
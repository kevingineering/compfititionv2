using System.Threading.Tasks;

namespace Core.Interfaces.Repos
{
  public interface IBaseRepo
  {
    Task Save(string message = null);
  }
}
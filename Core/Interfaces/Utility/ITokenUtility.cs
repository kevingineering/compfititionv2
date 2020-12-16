using Core.Entity;

namespace Core.Interfaces
{
  public interface ITokenUtility
  {
    string CreateToken(User user);
  }
}
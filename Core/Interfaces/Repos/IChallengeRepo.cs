using Core.Entity;

namespace Core.Interfaces.Repos
{
  public interface IChallengeRepo
  {
    void Create(Challenge challenge);
    void Update(Challenge challenge);
  }
}
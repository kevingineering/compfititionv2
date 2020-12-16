using System.Threading.Tasks;
using Core.Entity;

namespace Core.Interfaces.Repos
{
  public interface IChallengeRepo
  {
    void AddChallenge(Challenge challenge);
    void UpdateChallenge(Challenge challenge);
    void DeleteChallenge(Challenge challenge);
  }
}
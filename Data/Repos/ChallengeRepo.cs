using System.Threading.Tasks;
using Core.Entity;
using Core.Interfaces.Repos;
using Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Data.Repos
{
  public class ChallengeRepo : BaseRepo, IChallengeRepo
  {
    public ChallengeRepo(DataContext context) : base(context)
    {

    }

    public void AddChallenge(Challenge challenge)
    {
      _context.Challenges.Add(challenge);
    }

    public void UpdateChallenge(Challenge challenge)
    {
      _context.Challenges.Attach(challenge);
      _context.Entry(challenge).State = EntityState.Modified;
    }

    public void DeleteChallenge(Challenge Challenge)
    {
      _context.Challenges.Remove(Challenge);
    }
  }
}
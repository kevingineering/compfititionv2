using System;
using Core.Entity;

namespace Core.Specifications.Participants
{
  public class UserParticipationsSpec
  {
    public UserParticipationsSpec(Guid userId)
    //: base(x => x.UserId == userId)
    {
      // AddInclude(x => x.CompGoal);
    }
  }
}
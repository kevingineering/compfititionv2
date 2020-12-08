using System;
using Core.Entities;

namespace Core.Specifications.Participants
{
  public class UserParticipationsSpec : BaseSpecification<CompetitionParticipant>
  {
    public UserParticipationsSpec(Guid userId) : base(x => x.UserId == userId)
    {
      AddInclude(x => x.CompGoal);
    }
  }
}
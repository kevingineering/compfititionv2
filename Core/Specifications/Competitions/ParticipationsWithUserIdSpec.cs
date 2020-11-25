using System;
using Core.Entities;

namespace Core.Specifications.Competitions
{
  public class ParticipationsWithUserIdSpec : BaseSpecification<CompetitionParticipant>
  {
    public ParticipationsWithUserIdSpec(Guid userId) : base(x => x.UserId == userId)
    {

    }
  }
}
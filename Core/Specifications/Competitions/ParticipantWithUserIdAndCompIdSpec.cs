using System;
using Core.Entities;

namespace Core.Specifications.Competitions
{
  public class ParticipantWithUserIdAndCompIdSpec : BaseSpecification<CompetitionParticipant>
  {
    public ParticipantWithUserIdAndCompIdSpec(Guid userId, Guid compId) : base(x => x.UserId == userId && x.CompId == compId)
    {

    }
  }
}


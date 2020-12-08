using System;
using Core.Entities;

namespace Core.Specifications.Participants
{
  public class ParticipantSpec : BaseSpecification<CompetitionParticipant>
  {
    public ParticipantSpec(Guid userId, Guid compId) : base(x => x.UserId == userId && x.CompId == compId)
    {

    }
  }
}


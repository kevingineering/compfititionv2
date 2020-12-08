using System;
using Core.Entities;

namespace Core.Specifications.ParticipantRequest
{
  public class ParticipantRequestSpec : BaseSpecification<CompetitionParticipantRequest>
  {
    public ParticipantRequestSpec(Guid userId, Guid compId) : base(x => x.RequesterId == userId && x.CompId == compId)
    {

    }
  }
}
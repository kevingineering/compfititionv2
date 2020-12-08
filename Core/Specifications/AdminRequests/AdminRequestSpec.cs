using System;
using Core.Entities;

namespace Core.Specifications.AdminRequests
{
  public class AdminRequestSpec : BaseSpecification<CompetitionAdminRequest>
  {
    public AdminRequestSpec(Guid userId, Guid compId) : base(x => x.CompId == compId && x.ParticipantId == userId)
    {

    }
  }
}
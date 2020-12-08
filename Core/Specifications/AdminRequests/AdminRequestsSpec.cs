using System;
using Core.Entities;

namespace Core.Specifications.AdminRequests
{
  public class AdminRequestsSpec : BaseSpecification<CompetitionAdminRequest>
  {
    public AdminRequestsSpec(Guid compId) : base(x => x.CompId == compId)
    {

    }
  }
}
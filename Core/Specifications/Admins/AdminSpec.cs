using System;
using Core.Entities;

namespace Core.Specifications.Admins
{
  public class AdminSpec : BaseSpecification<CompetitionAdmin>
  {
    public AdminSpec(Guid userId, Guid compId) : base(x => x.UserId == userId && x.CompId == compId)
    {

    }
  }
}


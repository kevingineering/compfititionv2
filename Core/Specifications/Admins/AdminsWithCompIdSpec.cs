using System;
using Core.Entities;

namespace Core.Specifications.Admins
{
  public class CompetitionAdminsSpec : BaseSpecification<CompetitionAdmin>
  {
    public CompetitionAdminsSpec(Guid compId) : base(x => x.CompId == compId)
    {

    }
  }
}


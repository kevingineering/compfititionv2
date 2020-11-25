using System;
using Core.Entities;

namespace Core.Specifications.Competitions
{
  public class AdminsWithCompIdSpec : BaseSpecification<CompetitionAdmin>
  {
    public AdminsWithCompIdSpec(Guid compId) : base(x => x.CompId == compId)
    {

    }
  }
}


using System;
using Core.Entities;

namespace Core.Specifications.Competitions
{
  public class AdminWithUserIdAndCompIdSpec : BaseSpecification<CompetitionAdmin>
  {
    public AdminWithUserIdAndCompIdSpec(Guid userId, Guid compId) : base(x => x.UserId == userId && x.CompId == compId)
    {

    }
  }
}


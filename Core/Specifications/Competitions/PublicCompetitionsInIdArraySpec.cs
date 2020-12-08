using System;
using System.Linq;
using System.Collections.Generic;
using Core.Entities;

namespace Core.Specifications.Competitions
{
  public class PublicCompetitionsInIdArraySpec : BaseSpecification<CompetitionGoal>
  {
    public PublicCompetitionsInIdArraySpec(IReadOnlyList<Guid> compIds) : base(x => compIds.Contains(x.Id) && !x.IsPrivate)
    {
      AddInclude(x => x.Admins);
      AddInclude(x => x.Participants);
      AddOrderBy(x => x.StartTime);
    }
  }
}
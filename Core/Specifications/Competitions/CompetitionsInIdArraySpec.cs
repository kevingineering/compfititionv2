using System;
using System.Linq;
using System.Collections.Generic;
using Core.Entities;

namespace Core.Specifications.Competitions
{
  public class CompetitionsInIdArraySpec : BaseSpecification<CompetitionGoal>
  {
    public CompetitionsInIdArraySpec(IReadOnlyList<Guid> compIds, bool isPublicCompetitionsOnly) : base(x => compIds.Contains(x.Id) && (!isPublicCompetitionsOnly || !x.IsPrivate))
    {
      AddInclude(x => x.Admins);
      AddInclude(x => x.Participants);
      AddOrderBy(x => x.StartDate);
    }
  }
}
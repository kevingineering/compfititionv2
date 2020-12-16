using System;
using System.Linq;
using System.Collections.Generic;
using Core.Entity;

namespace Core.Specifications.Competitions
{
  public class PublicCompetitionsInIdArraySpec
  {
    public PublicCompetitionsInIdArraySpec(IReadOnlyList<Guid> competitionIds)
    //: base(x => competitionIds.Contains(x.Id) && !x.IsPrivate)
    {
      // AddInclude(x => x.Admins);
      // AddInclude(x => x.Participants);
      // AddOrderBy(x => x.StartTime);
    }
  }
}
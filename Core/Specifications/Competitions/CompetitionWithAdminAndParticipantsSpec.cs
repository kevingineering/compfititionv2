using System;
using Core.Entities;

namespace Core.Specifications.Competitions
{
  public class CompetitionWithAdminAndParticipantsSpec : BaseSpecification<CompetitionGoal>
  {
    public CompetitionWithAdminAndParticipantsSpec(Guid compId) : base(x => x.Id == compId)
    {
      AddInclude(x => x.Admins);
      AddInclude(x => x.Participants);
    }
  }
}
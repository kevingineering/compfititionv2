using System;
using Core.Entities;

namespace Core.Specifications.Competitions
{
  public class CompetitionAsAdminSpec : BaseSpecification<CompetitionGoal>
  {
    public CompetitionAsAdminSpec(Guid compId) : base(x => x.Id == compId)
    {
      AddInclude(x => x.Admins);
      AddInclude(x => x.Participants);
      AddInclude(x => x.Invites);
      AddInclude(x => x.ParticipantRequests);
      AddInclude(x => x.AdminRequests);
    }
  }
}
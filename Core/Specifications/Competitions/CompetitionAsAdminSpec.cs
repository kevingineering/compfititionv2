using System;
using Core.Entity;

namespace Core.Specifications.Competitions
{
  public class CompetitionAsAdminSpec
  {
    public CompetitionAsAdminSpec(Guid competitionId)
    //: base(x => x.Id == competitionId)
    {
      // AddInclude(x => x.Admins);
      // AddInclude(x => x.Participants);
      // AddInclude(x => x.Invites);
      // AddInclude(x => x.ParticipantRequests);
      // AddInclude(x => x.AdminRequests);
    }
  }
}
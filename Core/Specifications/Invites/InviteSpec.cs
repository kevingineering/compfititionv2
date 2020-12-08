using System;
using Core.Entities;

namespace Core.Specifications.Invites
{
  public class InviteSpec : BaseSpecification<CompetitionInvite>
  {
    public InviteSpec(Guid userId, Guid compId) : base(x => x.InviteeId == userId && x.CompId == compId)
    {

    }
  }
}
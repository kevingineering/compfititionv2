using System;

namespace Core.Entities
{
  public class CompetitionInvite : BaseEntity
  {
    public CompetitionInvite(Guid compId, Guid inviteeId)
    {
      CompId = compId;
      InviteeId = inviteeId;
    }

    public CompetitionInvite()
    {

    }

    //Competition Id
    public Guid CompId { get; set; }

    //User Id of subject
    public Guid InviteeId { get; set; }

    //public DateTime ExpirationDate { get; set; }
    //TODO how to make expire?

    //relationships
    public virtual CompetitionGoal Comp { get; set; }
    public virtual User Invitee { get; set; }
  }
}
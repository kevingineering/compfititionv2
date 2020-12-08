using System;

namespace Core.Entities
{
  public class CompetitionParticipantRequest : BaseEntity
  {
    public CompetitionParticipantRequest(Guid compId, Guid requesterId)
    {
      CompId = compId;
      RequesterId = requesterId;
    }

    public CompetitionParticipantRequest()
    {

    }

    //Competition Id
    public Guid CompId { get; set; }

    //User Id of subject
    public Guid RequesterId { get; set; }

    //public DateTime ExpirationDate { get; set; }
    //TODO how to make expire?

    //relationships
    public virtual CompetitionGoal Comp { get; set; }
    public virtual User Requester { get; set; }
  }
}
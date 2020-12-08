using System;

namespace Core.Entities
{
  public class CompetitionAdminRequest : BaseEntity
  {
    public CompetitionAdminRequest(Guid userId, Guid compId)
    {
      ParticipantId = userId;
      CompId = compId;
    }

    public CompetitionAdminRequest()
    {

    }

    //Competition Id
    public Guid CompId { get; set; }

    //User Id of subject
    public Guid ParticipantId { get; set; }

    //relationships
    public virtual CompetitionGoal Comp { get; set; }
    public virtual User Participant { get; set; }
  }
}
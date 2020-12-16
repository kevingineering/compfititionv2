using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity
{
  [Table("ParticipationRequests")]
  public class ParticipationRequest : BaseEntity
  {
    internal override string StyledName => "Participation request";

    public ParticipationRequest()
    {

    }

    public ParticipationRequest(Guid userId, Guid competitionId)
    {
      UserId = userId;
      CompetitionId = competitionId;
    }

    //compound key
    public Guid UserId { get; set; }
    public Guid CompetitionId { get; set; }

    //TODO how to make expire?
    //public DateTime ExpirationDate { get; set; }

    //relationships
    public virtual User User { get; set; }
    public virtual Competition Competition { get; set; }
  }
}
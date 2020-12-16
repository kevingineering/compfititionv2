using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity
{
  [Table("Invitations")]
  public class Invitation : BaseEntity
  {
    internal override string StyledName => "Invititation";

    public Invitation(Guid userId, Guid competitionId)
    {
      UserId = userId;
      CompetitionId = competitionId;
    }

    public Invitation()
    {

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
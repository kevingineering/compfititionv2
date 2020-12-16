using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity
{
  [Table("Admins")]
  public class Admin : BaseEntity
  {
    internal override string StyledName => "Admin";

    public Admin(Guid userId, Guid competitionId)
    {
      UserId = userId;
      CompetitionId = competitionId;
    }

    public Admin()
    {

    }

    //compound key
    public Guid UserId { get; set; }
    public Guid CompetitionId { get; set; }

    //relationships
    public virtual User User { get; set; }
    public virtual Competition Competition { get; set; }
  }
}
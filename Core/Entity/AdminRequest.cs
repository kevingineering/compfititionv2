using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity
{
  [Table("AdminRequests")]
  public class AdminRequest : BaseEntity
  {
    internal override string StyledName => "Admin request";

    public AdminRequest(Guid userId, Guid competitionId)
    {
      UserId = userId;
      CompetitionId = competitionId;
    }

    public AdminRequest()
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
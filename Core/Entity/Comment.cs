using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity
{
  [Table("Comments")]
  public class Comment : BaseEntity
  {
    internal override string StyledName => "Comment";

    public Guid CommentId { get; set; }
    public Guid UserId { get; set; }
    public Guid CompetitionId { get; set; }
    public string Body { get; set; }
    public DateTime CreatedAt { get; set; }

    //relationships
    public virtual User User { get; set; }
    public virtual Competition Competition { get; set; }
  }
}
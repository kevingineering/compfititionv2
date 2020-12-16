using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity
{
  [Table("Notifications")]
  public class Notification : BaseEntity
  {
    internal override string StyledName => "Notification";

    public Notification()
    {

    }

    public Guid NotificationId { get; set; }
    public Guid UserId { get; set; }
    //message displayed to user
    public string Message { get; set; }

    //relationships
    public virtual User User { get; set; }
  }
}
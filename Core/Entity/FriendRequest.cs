using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity
{
  [Table("FriendRequests")]
  public class FriendRequest : BaseEntity
  {
    internal override string StyledName => "Friend request";

    public FriendRequest(Guid sender, Guid receiver)
    {
      SenderId = sender;
      ReceiverId = receiver;
    }

    //parameterless constructor required by EF
    public FriendRequest()
    {

    }

    //compound key
    public Guid SenderId { get; set; }
    public Guid ReceiverId { get; set; }

    //relationships
    public virtual User Sender { get; set; }
    public virtual User Receiver { get; set; }
  }
}
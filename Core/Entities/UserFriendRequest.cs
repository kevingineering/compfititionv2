using System;

namespace Core.Entities
{
  public class UserFriendRequest : BaseEntity
  {
    public UserFriendRequest(Guid sender, Guid receiver)
    {
      SenderId = sender;
      ReceiverId = receiver;
    }

    //parameterless constructor required by EF
    public UserFriendRequest()
    {

    }

    //Compound Key
    public Guid SenderId { get; set; }
    public Guid ReceiverId { get; set; }

    //relationships
    public virtual User Sender { get; set; }
    public virtual User Receiver { get; set; }
  }
}
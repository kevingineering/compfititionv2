using System;

namespace Core.Entities
{
  public class UserFriendRequest : BaseEntity
  {
    public UserFriendRequest(Guid requester, Guid requestee)
    {
      RequesterId = requester;
      RequesteeId = requestee;
    }

    //parameterless constructor required by EF
    public UserFriendRequest()
    {

    }

    //Compound Key
    //Requester !== Requestee
    //Cannot have both Requestee => Requester and Requester => Requestee
    public Guid RequesterId { get; private set; }
    public virtual User Requester { get; set; }
    public Guid RequesteeId { get; private set; }
    public virtual User Requestee { get; set; }
  }
}
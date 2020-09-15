using System;

namespace Core.Entities
{
  public class UserFriendship : BaseEntity
  {
    public UserFriendship(Guid userId, Guid friendId)
    {
      User1Id = userId;
      User2Id = friendId;
    }

    //parameterless constructor required by EF
    public UserFriendship()
    {

    }

    //Compound (aka composite) Key
    //User1 !== User2
    public Guid User1Id { get; set; }
    public virtual User User1 { get; set; }
    public Guid User2Id { get; set; }
    public virtual User User2 { get; set; }
  }
}
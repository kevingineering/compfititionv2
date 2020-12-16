using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity
{
  [Table("Friendships")]
  public class Friendship : BaseEntity
  {
    internal override string StyledName => "Friendship";

    public Friendship(Guid user1Id, Guid user2Id)
    {
      User1Id = user1Id;
      User2Id = user2Id;
    }

    public Friendship()
    {

    }

    //compound key
    public Guid User1Id { get; set; }
    public Guid User2Id { get; set; }

    //relationships
    public virtual User User1 { get; set; }
    public virtual User User2 { get; set; }
  }
}
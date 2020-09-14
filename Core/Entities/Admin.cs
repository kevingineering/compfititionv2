using System;

namespace Core.Entities
{
  public class Admin : BaseEntity
  {
    //Compound Key
    public Guid CompId { get; set; }
    public Guid UserId { get; set; }
  }
}
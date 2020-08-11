using System;

namespace Core.Entities
{
  public class User : BaseEntity
  {
    public string Name { get; set; }

    //must be unique
    public string Email { get; set; }

    public string Password { get; set; }

    public DateTime RegisterDate { get; set; }

    //decides if other users can search for this user
    public bool IsSearchable { get; set; }
  }
}
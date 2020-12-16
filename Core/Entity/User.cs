using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity
{
  [Table("Users")]
  public class User : BaseEntity
  {
    internal override string StyledName => "User";

    public User()
    {

    }

    public User(string name, string email, string hashedPassword, bool isSearchable)
    {
      Name = name;
      Email = email;
      Password = hashedPassword;
      IsSearchable = isSearchable;
    }

    public Guid UserId { get; set; }
    public string Name { get; set; }
    //must be unique
    public string Email { get; set; }
    public string Password { get; set; }
    public DateTime RegisterDate { get; set; } = DateTime.Now;
    //decides if other users can find this user if not friends
    public bool IsSearchable { get; set; }

    //relationships
    public virtual ICollection<Goal> Goals { get; set; }
    public virtual ICollection<Friendship> User1Friends { get; set; }
    public virtual ICollection<Friendship> User2Friends { get; set; }
    public virtual ICollection<FriendRequest> Senders { get; set; }
    public virtual ICollection<FriendRequest> Receivers { get; set; }
    public virtual ICollection<Participant> Participations { get; set; }
    public virtual ICollection<Comment> Comments { get; set; }
    public virtual ICollection<Admin> Admins { get; set; }
    public virtual ICollection<ParticipationRequest> ParticipationRequests { get; set; }
    public virtual ICollection<AdminRequest> AdminRequests { get; set; }
    public virtual ICollection<Invitation> Invitations { get; set; }
    public virtual ICollection<Notification> Notifications { get; set; }
  }
}
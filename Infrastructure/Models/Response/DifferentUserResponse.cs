using System;
using Core.Entity;

namespace Infrastructure.Models.Response
{
  public class DifferentUserResponse
  {
    public DifferentUserResponse(User user)
    {
      UserId = user.UserId;
      Email = user.Email;
      Name = user.Name;
    }

    public DifferentUserResponse(Guid userId, string email, string name)
    {
      UserId = userId;
      Email = email;
      Name = name;
    }

    public Guid UserId { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
  }
}
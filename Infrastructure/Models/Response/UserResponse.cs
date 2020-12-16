using System;
using Core.Entity;

namespace Infrastructure.Models.Response
{
  public class UserResponse
  {
    public UserResponse(User user, string token)
    {
      UserId = user.UserId;
      Email = user.Email;
      Name = user.Name;
      Token = token;
      IsSearchable = user.IsSearchable;
    }

    public Guid UserId { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public string Token { get; set; }
    public bool IsSearchable { get; set; }
  }
}
using Core.Entity;

namespace Infrastructure.Models.Response
{
  public class UserResponse : DifferentUserResponse
  {
    public UserResponse(User user, string token) : base(user)
    {
      Token = token;
      IsSearchable = user.IsSearchable;
    }

    public string Token { get; set; }
    public bool IsSearchable { get; set; }
  }
}
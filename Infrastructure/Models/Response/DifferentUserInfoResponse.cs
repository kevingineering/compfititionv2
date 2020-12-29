using System;

namespace Infrastructure.Models.Response
{
  public class DifferentUserInfoResponse : UserInfoHelper
  {
    public Guid UserId { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public Boolean IsFriend { get; set; }
  }
}
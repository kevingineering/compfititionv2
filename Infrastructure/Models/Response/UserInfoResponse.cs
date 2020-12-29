using System.Collections.Generic;

namespace Infrastructure.Models.Response
{
  public class UserInfoResponse : UserInfoHelper
  {
    public IReadOnlyList<DifferentUserResponse> UsersWhoSentFriendRequest { get; set; }
  }
}
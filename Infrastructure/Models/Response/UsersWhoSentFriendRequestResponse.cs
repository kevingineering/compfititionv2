using System.Collections.Generic;

namespace Infrastructure.Models.Response
{
  public class UsersWhoSentFriendRequestResponse
  {
    public UsersWhoSentFriendRequestResponse(IReadOnlyList<DifferentUserResponse> usersWhoSentFriendRequest)
    {
      UsersWhoSentFriendRequest = usersWhoSentFriendRequest;
    }

    public IReadOnlyList<DifferentUserResponse> UsersWhoSentFriendRequest { get; set; }
  }
}
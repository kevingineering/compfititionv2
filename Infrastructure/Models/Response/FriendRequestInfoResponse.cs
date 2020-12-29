using System.Collections.Generic;

namespace Infrastructure.Models.Response
{
  public class FriendRequestInfoResponse
  {
    public IReadOnlyList<DifferentUserResponse> UsersWhoReceivedFriendRequest { get; set; }
    public IReadOnlyList<DifferentUserResponse> UsersWhoSentFriendRequest { get; set; }
    public IReadOnlyList<DifferentUserResponse> SearchableUsers { get; set; }
  }
}
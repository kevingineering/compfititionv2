using System.Collections.Generic;

namespace API.DTOs.ReturnDTOs
{
  public class UserFriendRequestReturnDTO
  {
    public IReadOnlyList<DifferentUserReturnDTO> SentRequestUsers { get; set; }
    public IReadOnlyList<DifferentUserReturnDTO> ReceivedRequestUsers { get; set; }
    public IReadOnlyList<DifferentUserReturnDTO> SearchableUsers { get; set; }
  }
}
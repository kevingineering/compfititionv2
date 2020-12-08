using System.Collections.Generic;

namespace API.DTOs.ReturnDTOs
{
  public class ReceivedUserFriendRequestReturnDTO
  {
    public IReadOnlyList<DifferentUserReturnDTO> SentRequestUsers { get; set; }
  }
}
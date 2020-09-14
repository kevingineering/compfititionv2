using System;

namespace API.DTOs
{
  public class UserFriendRequestDTO
  {
    public Guid RequesterId { get; private set; }
    public Guid RequesteeId { get; private set; }
  }
}
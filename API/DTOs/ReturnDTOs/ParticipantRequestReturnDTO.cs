using System;

namespace API.DTOs.ReturnDTOs
{
  public class ParticipantRequestReturnDTO
  {
    public Guid CompId { get; set; }
    public Guid RequesterId { get; set; }
  }
}
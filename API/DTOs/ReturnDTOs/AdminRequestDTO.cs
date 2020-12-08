using System;

namespace API.DTOs.ReturnDTOs
{
  public class AdminRequestDTO
  {
    public Guid CompId { get; set; }
    public Guid ParticipantId { get; set; }
  }
}
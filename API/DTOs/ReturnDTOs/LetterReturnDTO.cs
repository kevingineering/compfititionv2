using System;

namespace API.DTOs.ReturnDTOs
{
  public class LetterReturnDTO
  {
    public Guid Id { get; set; }
    public Guid CompId { get; set; }
    public string Message { get; set; }
    public Guid ReceiverId { get; set; }
    public Guid SenderId { get; set; }
    public string Type { get; set; }
  }
}
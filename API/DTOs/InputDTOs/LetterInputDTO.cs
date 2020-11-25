using System;

namespace API.DTOs.InputDTOs
{
  public class LetterInputDTO
  {
    public Guid CompId { get; set; }
    public Guid ReceiverId { get; set; }
    public Guid SenderId { get; set; }
    public string Type { get; set; }
  }
}

//ToUser - Tell User an Admin invited user to join competition
//FromUser - Tell Admin a User asked to join competition
//RequestAdmin - Tell User an Admin asked them to be a competition Admin

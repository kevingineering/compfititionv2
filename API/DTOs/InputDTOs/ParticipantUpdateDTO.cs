using System;

namespace API.DTOs.InputDTOs
{
  //for target or initial value
  public class ParticipantUpdateDTO
  {
    public Guid CompId { get; set; }
    public Decimal Value { get; set; }
  }
}
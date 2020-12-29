using System;

namespace Infrastructure.Models.Request
{
  //for target or initial value
  public class UpdateParticipantRequest
  {
    public Guid CompetitionId { get; set; }
    public Decimal Value { get; set; }
  }
}
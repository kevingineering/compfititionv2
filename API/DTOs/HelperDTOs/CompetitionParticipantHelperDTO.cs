using System;

namespace Infrastructure.Models.HelperDTOs
{
  public class CompetitionParticipantHelperDTO
  {
    public CompetitionParticipantHelperDTO()
    {

    }

    public CompetitionParticipantHelperDTO(Guid userId, string name, string ledger, decimal? initialValue,
    decimal? target)
    {
      UserId = userId;
      Name = name;
      Ledger = ledger;
      InitialValue = initialValue;
      Target = target;
    }

    public Guid UserId { get; set; }
    public string Name { get; set; }
    public string Ledger { get; set; }
    public decimal? InitialValue { get; set; }
    public decimal? Target { get; set; }
  }
}
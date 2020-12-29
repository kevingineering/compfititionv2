using System;
using Core.Entity;

namespace Infrastructure.Models.Response
{
  public class ParticipantResponse
  {
    public ParticipantResponse(Participant participant)
    {
      UserId = participant.UserId;
      Name = participant.User.Name;
      Ledger = participant.Ledger;
      InitialValue = participant.InitialValue;
      Target = participant.Target;
    }

    public Guid UserId { get; set; }
    public string Name { get; set; }
    public string Ledger { get; set; }
    public decimal? InitialValue { get; set; }
    public decimal? Target { get; set; }
  }
}
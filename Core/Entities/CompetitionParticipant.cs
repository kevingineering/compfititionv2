using System;
using System.Text.Json.Serialization;

namespace Core.Entities
{
  public class CompetitionParticipant : BaseEntity
  {
    public CompetitionParticipant(Guid compId, Guid userId, decimal? initialValue = null)
    {
      CompId = compId;
      UserId = userId;
      Ledger = null;
      InitialValue = initialValue;
    }

    //parameterless constructor required by EF
    public CompetitionParticipant()
    {

    }

    public Guid CompId { get; set; }
    public Guid UserId { get; set; }
    public string Ledger { get; set; }
    public decimal? InitialValue { get; set; } = null;
    public decimal? Target { get; set; } = null;

    //relationships
    [JsonIgnore]
    public virtual CompetitionGoal CompGoal { get; set; }
    [JsonIgnore]
    public virtual User User { get; set; }
  }
}
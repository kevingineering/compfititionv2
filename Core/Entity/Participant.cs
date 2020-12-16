using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Core.Entity
{
  [Table("Participants")]
  public class Participant : BaseEntity
  {
    internal override string StyledName => "Participant";

    public Participant()
    {

    }

    public Participant(Guid userId, Guid competitionId)
    {
      UserId = userId;
      CompetitionId = competitionId;
      Ledger = null;
    }

    public Guid UserId { get; set; }
    public Guid CompetitionId { get; set; }
    public string Ledger { get; set; }
    public decimal? InitialValue { get; set; } = null;
    public decimal? Target { get; set; } = null;

    //relationships
    [JsonIgnore]
    public virtual User User { get; set; }
    [JsonIgnore]
    public virtual Competition Competition { get; set; }
  }
}
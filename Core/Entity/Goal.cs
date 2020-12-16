using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity
{
  [Table("Goals")]
  public class Goal : BaseEntity
  {
    internal override string StyledName => "Goal";

    public Goal()
    {

    }

    public Goal(Guid userId, Guid challengeId, decimal? initialValue, decimal? target, bool isPrivate)
    {
      UserId = userId;
      ChallengeId = challengeId;
      InitialValue = initialValue;
      Target = target;
      IsPrivate = isPrivate;
    }

    public Guid GoalId { get; set; }
    public Guid UserId { get; set; }
    public Guid ChallengeId { get; set; }
    public decimal? InitialValue { get; set; }
    //cumulative or difference - number of units a user wishes to achieve
    public decimal? Target { get; set; }
    //determines who can see goal - only user (true) or user friends (false)
    public bool IsPrivate { get; set; }
    //comma seperated array - saved as JSON 
    public string Ledger { get; set; }

    //relationships
    public User User { get; set; }
    public Challenge Challenge { get; set; }
  }
}
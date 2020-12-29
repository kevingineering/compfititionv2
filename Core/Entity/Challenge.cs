using System;

namespace Core.Entity
{
  public enum CategoryEnum { passfail, cumulative, difference }

  public class Challenge : BaseEntity
  {
    internal override string StyledName => "Challenge";

    public Challenge()
    {

    }

    public Guid ChallengeId { get; set; }
    public string Name { get; set; }
    //length in days
    public int Duration { get; set; }
    //day competition starts (not created)
    public DateTime StartTime { get; set; }
    public CategoryEnum Category { get; set; }
    //optional
    public string Description { get; set; }
    //cumulative and difference types only 
    public string Units { get; set; } = null;
    //pass fail only - number of days per week
    public int? DaysPerWeek { get; set; }

    // public Guid? GoalId { get; set; }
    // public Guid? CompetitionId { get; set; }

    // //relationships
    // public virtual Goal Goal { get; set; }
    // public virtual Competition Competition { get; set; }
  }
}
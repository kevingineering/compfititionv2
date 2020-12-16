using System;
using Core.Errors;

namespace Core.Entity
{
  public enum CategoryEnum { passfail, cumulative, difference }

  public class Challenge : BaseEntity
  {
    internal override string StyledName => "Challenge";

    public Challenge()
    {

    }

    public Challenge(string name, int duration, DateTime startTime, string category, string description, string units, int? daysPerWeek)
    {
      VerifyStartTime(startTime);
      ChallengeId = new Guid();
      Name = name;
      Duration = duration;
      StartTime = startTime;
      Category = ConvertString(category);
      Description = description;
      Units = units;
      DaysPerWeek = daysPerWeek;
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

    //relationships
    public virtual Goal Goal { get; set; }
    public virtual Competition Competition { get; set; }

    private CategoryEnum ConvertString(string category)
    {
      //Test
      if (Enum.TryParse<CategoryEnum>(category, out CategoryEnum result))
      {
        return result;
      }
      else
      {
        throw new ApiError(400);
      }
    }

    private void VerifyStartTime(DateTime startTime)
    {
      if (startTime < DateTime.Now)
      {
        throw new ApiError(400, "Start date cannot be in the past.");
      }
    }
  }
}
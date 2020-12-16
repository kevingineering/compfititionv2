using System;
using Core.Entity;

namespace Infrastructure.Models.Response
{
  public abstract class ChallengeResponse
  {
    public ChallengeResponse(Challenge challenge)
    {
      Name = challenge.Name;
      Duration = challenge.Duration;
      StartTime = challenge.StartTime;
      Category = challenge.Category.ToString();
      Description = challenge.Description;
      Units = challenge.Units;
      DaysPerWeek = challenge.DaysPerWeek;
    }

    public string Name { get; set; }
    public int Duration { get; set; }
    public DateTime StartTime { get; set; }
    public string Category { get; set; }
    public string Description { get; set; }
    public string Units { get; set; }
    public int? DaysPerWeek { get; set; }
  }
}
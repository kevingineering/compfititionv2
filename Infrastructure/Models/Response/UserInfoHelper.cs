using System.Collections.Generic;

namespace Infrastructure.Models.Response
{
  public class UserInfoHelper
  {
    public IReadOnlyList<GoalResponse> PastGoals { get; set; }
    public IReadOnlyList<GoalResponse> ActiveGoals { get; set; }
    //Competitions are returned as individual goals for use on user dashboard
    public IReadOnlyList<GoalResponse> PastCompetitions { get; set; }
    public IReadOnlyList<GoalResponse> ActiveCompetitions { get; set; }
    public IReadOnlyList<DifferentUserResponse> Friends { get; set; }
  }
}
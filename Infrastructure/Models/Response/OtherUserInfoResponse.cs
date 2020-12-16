using System;
using System.Collections.Generic;

namespace Infrastructure.Models.Response
{
  public class OtherUserInfoResponse
  {
    public Guid UserId { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public IReadOnlyList<GoalResponse> PastGoals { get; set; }
    public IReadOnlyList<GoalResponse> ActiveGoals { get; set; }
    //Competitions are returned as individual goals for use on user dashboard
    public IReadOnlyList<GoalResponse> PastCompetitions { get; set; }
    public IReadOnlyList<GoalResponse> ActiveCompetitions { get; set; }
    public IReadOnlyList<DifferentUserResponse> Friends { get; set; }
    public Boolean IsFriend { get; set; }
  }
}
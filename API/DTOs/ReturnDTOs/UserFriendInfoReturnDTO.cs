using System;
using System.Collections.Generic;

namespace API.DTOs.ReturnDTOs
{
  public class UserFriendInfoReturnDTO
  {
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public IReadOnlyList<GoalReturnDTO> PastGoals { get; set; }
    public IReadOnlyList<GoalReturnDTO> ActiveGoals { get; set; }
    public IReadOnlyList<GoalReturnDTO> PastCompetitions { get; set; }
    public IReadOnlyList<GoalReturnDTO> ActiveCompetitions { get; set; }
    public IReadOnlyList<UserReturnDTO> Friends { get; set; }
    public Boolean IsFriend { get; set; }
  }
}
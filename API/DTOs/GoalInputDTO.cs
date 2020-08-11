using System;

namespace API.DTOs
{
  public class GoalInputDTO
  {
    public string Name { get; set; }
    public int Duration { get; set; }
    public DateTime StartDate { get; set; }
    public string Type { get; set; }
    public string Description { get; set; }
    public string Units { get; set; }
    public int Total { get; set; }
    public bool IsPrivate { get; set; }
  }
}
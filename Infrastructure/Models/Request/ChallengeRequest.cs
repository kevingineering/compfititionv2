using System;
using System.ComponentModel.DataAnnotations;

namespace Infrastructure.Models.Request
{
  public abstract class ChallengeRequest
  {
    [Required]
    public string Name { get; set; }
    [Required]
    [Range(1, 3653, ErrorMessage = "Duration must be at least one day but less than ten years.")]
    public int Duration { get; set; }
    [Required]
    public DateTime StartTime { get; set; }
    [Required]
    public string Category { get; set; }
    public string Description { get; set; }
    public string Units { get; set; }
    [Range(1, 7, ErrorMessage = "You must choose between one and seven days per week.")]
    public int? DaysPerWeek { get; set; }
  }
}
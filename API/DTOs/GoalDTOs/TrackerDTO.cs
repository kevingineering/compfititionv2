using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs.GoalDTOs
{
  public class TrackerDTO
  {
    [Required]
    public Guid Id { get; set; }
    [Required]
    public string Tracker { get; set; }
  }
}
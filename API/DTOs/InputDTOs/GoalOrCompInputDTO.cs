using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs.InputDTOs
{
  public class GoalOrCompInputDTO
  {
    [Required]
    public string Name { get; set; }
    [Required]
    public int Duration { get; set; }
    [Required]
    public DateTime StartDate { get; set; }
    [Required]
    public string Type { get; set; }
    public string Description { get; set; }
    public string Units { get; set; }
    [Required]
    public decimal Target { get; set; }
    [Required]
    public bool IsPrivate { get; set; }
    public decimal? InitialValue { get; set; }
    // should ints be decimal?
  }
}
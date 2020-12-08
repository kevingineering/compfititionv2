using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs.InputDTOs
{
  public class CompInputDTO
  {
    [Required]
    public string Name { get; set; }
    [Required]
    public int Duration { get; set; }
    [Required]
    public DateTime StartTime { get; set; }
    [Required]
    public string Type { get; set; }
    public string Description { get; set; }
    public string Units { get; set; }
    public int? Frequency { get; set; }
    public bool IsHighestScoreWins { get; set; }
    [Required]
    public bool IsPrivate { get; set; }
    public decimal? InitialValue { get; set; }
  }
}
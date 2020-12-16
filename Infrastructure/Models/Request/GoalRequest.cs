using System.ComponentModel.DataAnnotations;

namespace Infrastructure.Models.Request
{
  public class GoalRequest : ChallengeRequest
  {
    public decimal? InitialValue { get; set; }
    [Required]
    public decimal? Target { get; set; }
    [Required]
    public bool IsPrivate { get; set; }
  }
}
using System.ComponentModel.DataAnnotations;

namespace Infrastructure.Models.Request
{
  public class CompetitionRequest : ChallengeRequest
  {
    public bool IsHighestScoreWins { get; set; }
    [Required]
    public bool IsPrivate { get; set; }
  }
}
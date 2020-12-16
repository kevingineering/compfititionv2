using System;
using System.Collections.Generic;
using Core.Entity;

namespace Infrastructure.Models.Response
{
  public class CompetitionResponse : ChallengeResponse
  {
    public CompetitionResponse(Competition competition) : base(competition.Challenge)
    {
      CompetitionId = competition.CompetitionId;
      IsPrivate = competition.IsPrivate;
      IsHighestScoreWins = competition.IsHighestScoreWins;
    }

    public Guid CompetitionId { get; set; }
    public bool IsHighestScoreWins { get; set; }
    public bool IsPrivate { get; set; }

    // public IReadOnlyList<CompetitionParticipantHelperDTO> Participants { get; set; }
    public IReadOnlyList<Guid> ParticipantRequests { get; set; }
    public IReadOnlyList<Guid> Invites { get; set; }
    public IReadOnlyList<Guid> Admins { get; set; }
    public IReadOnlyList<Guid> AdminRequests { get; set; }
  }
}
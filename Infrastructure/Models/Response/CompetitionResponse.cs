using System;
using System.Collections.Generic;
using System.Linq;
using Core.Entity;

namespace Infrastructure.Models.Response
{
  public class CompetitionResponse : ChallengeResponse
  {
    //return different information if user is admin or participant
    //userId is only required if user is not admin
    //participationRequests, invitiations, and adminRequests are null after competition creation
    public CompetitionResponse(Competition competition, Boolean isAdmin, Guid userId) : base(competition.Challenge)
    {
      CompetitionId = competition.CompetitionId;
      IsPrivate = competition.IsPrivate;
      IsHighestScoreWins = competition.IsHighestScoreWins;
      Participants = competition.Participants
        .Select(x => new ParticipantResponse(x))
        .ToList();
      ParticipationRequests = competition.ParticipationRequests != null
        ? isAdmin
          ? competition.ParticipationRequests
            .Select(x => new CompetitionUserResponse(x))
            .ToList()
          : competition.ParticipationRequests
            .Where(x => x.UserId == userId)
            .Select(x => new CompetitionUserResponse(x))
            .ToList()
        : new List<CompetitionUserResponse>();
      Invitations = competition.Invitations != null
        ? isAdmin
          ? competition.Invitations
            .Select(x => new CompetitionUserResponse(x))
            .ToList()
          : competition.Invitations
            .Where(x => x.UserId == userId)
            .Select(x => new CompetitionUserResponse(x))
            .ToList()
        : new List<CompetitionUserResponse>();
      Admins = competition.Admins
        .Select(x => x.UserId)
        .ToList();
      AdminRequests = competition.AdminRequests != null
      ? isAdmin
        ? competition.AdminRequests
          .Select(x => x.UserId)
          .ToList()
        : competition.AdminRequests
          .Where(x => x.UserId == userId)
          .Select(x => x.UserId)
          .ToList()
      : new List<Guid>();
    }

    public Guid CompetitionId { get; set; }
    public bool IsHighestScoreWins { get; set; }
    public bool IsPrivate { get; set; }

    public IReadOnlyList<ParticipantResponse> Participants { get; set; }
    public IReadOnlyList<CompetitionUserResponse> ParticipationRequests { get; set; }
    public IReadOnlyList<CompetitionUserResponse> Invitations { get; set; }
    public IReadOnlyList<Guid> Admins { get; set; }
    public IReadOnlyList<Guid> AdminRequests { get; set; }
  }
}
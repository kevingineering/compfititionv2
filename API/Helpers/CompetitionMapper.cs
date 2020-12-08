using System;
using System.Linq;
using API.DTOs.HelperDTOs;
using API.DTOs.ReturnDTOs;
using Core.Entities;

namespace API.Helpers
{
  public static class CompetitionMapper
  {
    public static CompetitionReturnDTO MapCompetition(bool isAdmin, CompetitionGoal competition, Guid userId)
    {
      //participants must get name from included name property
      var participants = competition.Participants
        .Select(x => new CompetitionParticipantHelperDTO
        {
          UserId = x.UserId,
          Name = x.User.Name,
          Ledger = x.Ledger,
          InitialValue = x.InitialValue,
          Target = x.Target
        })
        .OrderBy(x => x.Name)
        .ToList();

      var competitionDTO = new CompetitionReturnDTO
      {
        Id = competition.Id,
        Name = competition.Name,
        Duration = competition.Duration,
        StartTime = competition.StartTime,
        Type = competition.Type.ToString(),
        Description = competition.Description,
        Units = competition.Units,
        Frequency = competition.Frequency,
        IsHighestScoreWins = competition.isHighestScoreWins,
        IsPrivate = competition.IsPrivate,
        Participants = participants,
        ParticipantRequests = competition.ParticipantRequests.Select(x => x.RequesterId).ToList(),
        Invites = competition.Invites.Select(x => x.InviteeId).ToList(),
        Admins = competition.Admins.Select(x => x.UserId).ToList(),
        AdminRequests = competition.AdminRequests.Select(x => x.ParticipantId).ToList()
      };

      //don't return certain information if user is not admin
      if (!isAdmin)
      {
        competitionDTO.AdminRequests.Where(x => x == userId);
        competitionDTO.ParticipantRequests.Where(x => x == userId);
        competitionDTO.Invites.Where(x => x == userId);
      }

      return competitionDTO;
    }
  }
}
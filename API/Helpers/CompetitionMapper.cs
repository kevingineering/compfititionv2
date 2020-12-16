using System;
using System.Linq;
using Infrastructure.Models.HelperDTOs;
using Infrastructure.Models.Response;
using Core.Entity;

namespace API.Helpers
{
  public static class CompetitionMapper
  {
    public static CompetitionResponse MapCompetition(bool isAdmin, Competition competition, Guid userId)
    {
      throw new NotImplementedException();

      // //participants must get name from included name property
      // var participants = competition.Participants
      //   .Select(x => new CompetitionParticipantHelperDTO
      //   {
      //     UserId = x.UserId,
      //     Name = x.User != null ? x.User.Name : "TODO",
      //     Ledger = x.Ledger,
      //     InitialValue = x.InitialValue,
      //     Target = x.Target
      //   })
      //   .OrderBy(x => x.Name)
      //   .ToList();

      // var competitionDTO = new CompetitionResponse
      // {
      //   Id = competition.Id,
      //   Name = competition.Name,
      //   Duration = competition.Duration,
      //   StartTime = competition.StartTime,
      //   Type = competition.Type.ToString(),
      //   Description = competition.Description,
      //   Units = competition.Units,
      //   Frequency = competition.DaysPerWeek,
      //   IsHighestScoreWins = competition.IsHighestScoreWins,
      //   IsPrivate = competition.IsPrivate,
      //   Participants = participants,
      //   ParticipantRequests = competition.ParticipationRequests.Select(x => x.RequesterId).ToList(),
      //   Invites = competition.Invites.Select(x => x.InviteeId).ToList(),
      //   Admins = competition.Admins.Select(x => x.UserId).ToList(),
      //   AdminRequests = competition.AdminRequests.Select(x => x.ParticipantId).ToList()
      // };

      // //don't return certain information if user is not admin
      // if (!isAdmin)
      // {
      //   competitionDTO.AdminRequests.Where(x => x == userId);
      //   competitionDTO.ParticipantRequests.Where(x => x == userId);
      //   competitionDTO.Invites.Where(x => x == userId);
      // }

      // return competitionDTO;
    }
  }
}
using System;
using System.Collections.Generic;
using API.DTOs.HelperDTOs;

namespace API.DTOs.ReturnDTOs
{
  public class CompetitionReturnDTO
  {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Duration { get; set; }
    public DateTime StartTime { get; set; }
    public string Type { get; set; }
    public string Description { get; set; }
    public string Units { get; set; } = null;
    public int Frequency { get; set; }
    public bool IsHighestScoreWins { get; set; }
    public bool IsPrivate { get; set; }
    public ICollection<CompetitionParticipantHelperDTO> Participants { get; set; }
    public ICollection<Guid> ParticipantRequests { get; set; }
    public ICollection<Guid> Invites { get; set; }
    public ICollection<Guid> Admins { get; set; }
    public ICollection<Guid> AdminRequests { get; set; }
  }
}
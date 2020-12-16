using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity
{
  [Table("Competitions")]
  public class Competition : BaseEntity
  {
    internal override string StyledName => "Competition";

    public Competition()
    {

    }

    public Competition(Guid challengeId, bool isHighestScoreWins, bool isPrivate)
    {
      ChallengeId = challengeId;
      IsHighestScoreWins = isHighestScoreWins;
      IsPrivate = isPrivate;
    }

    public Guid CompetitionId { get; set; }
    public Guid ChallengeId { get; set; }
    public bool IsHighestScoreWins { get; set; } = true;
    //determines who can see competition - only participants (true) or participant friends (false)
    public bool IsPrivate { get; set; }

    //relationships
    public virtual Challenge Challenge { get; set; }
    public virtual ICollection<Participant> Participants { get; set; }
    public virtual ICollection<Admin> Admins { get; set; }
    public virtual ICollection<Comment> Comments { get; set; }
    public virtual ICollection<AdminRequest> AdminRequests { get; set; }
    public virtual ICollection<Invitation> Invitations { get; set; }
    public virtual ICollection<ParticipationRequest> ParticipationRequests { get; set; }
  }
}
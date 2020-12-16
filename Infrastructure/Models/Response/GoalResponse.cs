using System;
using Core.Entity;

namespace Infrastructure.Models.Response
{
  public class GoalResponse : ChallengeResponse
  {
    public GoalResponse(Goal goal) : base(goal.Challenge)
    {
      GoalId = goal.GoalId;
      InitialValue = goal.InitialValue;
      Target = goal.Target;
      IsPrivate = goal.IsPrivate;
      Ledger = goal.Ledger;
    }

    public GoalResponse(Competition competition, Participant participant) : base(competition.Challenge)
    {
      GoalId = competition.CompetitionId;
      IsPrivate = competition.IsPrivate;
      InitialValue = participant.InitialValue;
      Target = participant.Target;
      Ledger = participant.Ledger;
    }

    public Guid GoalId { get; set; }
    public decimal? InitialValue { get; set; }
    public decimal? Target { get; set; }
    public bool IsPrivate { get; set; }
    public string Ledger { get; set; }
  }
}
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications.Competitions;
using System.Linq;
using Core.Specifications.Participants;

namespace Infrastructure.Services
{
  public class CompetitionService : AbstractService<CompetitionGoal>, ICompetitionService
  {
    private readonly IUnitOfWork _unitOfWork;

    public CompetitionService(IUnitOfWork unitOfWork) : base(unitOfWork)
    {
      _unitOfWork = unitOfWork;
    }

    public async Task<bool> AddCompetitionAsync(CompetitionGoal comp, Guid userId)
    {
      var participant = new CompetitionParticipant(comp.Id, userId);
      var admin = new CompetitionAdmin(comp.Id, userId);

      _unitOfWork.Repository<CompetitionGoal>().Add(comp);
      _unitOfWork.Repository<CompetitionParticipant>().Add(participant);
      _unitOfWork.Repository<CompetitionAdmin>().Add(admin);
      var changes = await _unitOfWork.Complete();

      if (changes <= 0)
      {
        return false;
      }

      return true;
    }

    public async Task<IReadOnlyList<UserGoal>> GetUserCompetitionGoals(Guid userId)
    {
      //get participations (includes competitions)
      var spec = new UserParticipationsSpec(userId);
      var participations = (await _unitOfWork.Repository<CompetitionParticipant>().ListAsync(spec)).OrderBy(x => x.CompGoal.StartTime);
      var goals = new List<UserGoal>();
      foreach (var participation in participations)
      {
        goals.Add(new UserGoal
        {
          Id = participation.CompGoal.Id,
          Name = participation.CompGoal.Name,
          UserId = userId,
          Duration = participation.CompGoal.Duration,
          StartTime = participation.CompGoal.StartTime,
          Type = participation.CompGoal.Type,
          Description = participation.CompGoal.Description,
          Units = participation.CompGoal.Units,
          Target = participation.Target,
          IsPrivate = participation.CompGoal.IsPrivate,
          Ledger = participation.Ledger
        });
      }

      return goals;
    }

    public async Task<IReadOnlyList<UserGoal>> GetFriendPublicCompetitionGoals(Guid friendId)
    {
      var spec = new UserParticipationsSpec(friendId);
      var participations = await _unitOfWork.Repository<CompetitionParticipant>().ListAsync(spec);
      var compIds = participations.Select(x => x.CompId).ToList();
      var compSpec = new PublicCompetitionsInIdArraySpec(compIds);
      var competitions = await _unitOfWork.Repository<CompetitionGoal>().ListAsync(compSpec);
      var goals = new List<UserGoal>();
      foreach (var competition in competitions)
      {
        goals.Add(new UserGoal
        {
          Id = competition.Id,
          Name = competition.Name,
          UserId = friendId,
          Duration = competition.Duration,
          StartTime = competition.StartTime,
          Type = competition.Type,
          Description = competition.Description,
          Units = competition.Units,
          Target = competition.Participants.First(x => x.UserId == friendId).Target,
          IsPrivate = competition.IsPrivate,
          Ledger = competition.Participants.First(x => x.UserId == friendId).Ledger
        });
      }

      return goals;
    }
  }
}
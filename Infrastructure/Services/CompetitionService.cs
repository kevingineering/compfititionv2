using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications.Competitions;
using System.Linq;

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

    public async Task<bool> IsUserInCompetition(Guid compId)
    {
      var competition = await _unitOfWork.Repository<CompetitionGoal>().GetByIdAsync(compId);
      return true;
    }

    public async Task<IReadOnlyList<UserGoal>> GetUserCompetitionGoals(Guid userId)
    {
      //TODO - could you use a join and make this more efficient
      var spec = new ParticipationsWithUserIdSpec(userId);
      var participations = await _unitOfWork.Repository<CompetitionParticipant>().ListAsync(spec);
      var compIds = participations.Select(x => x.CompId).ToList();
      var compSpec = new CompetitionsInIdArraySpec(compIds, false);
      var competitions = await _unitOfWork.Repository<CompetitionGoal>().ListAsync(compSpec);
      var goals = new List<UserGoal>();
      foreach (var competition in competitions)
      {
        goals.Add(new UserGoal
        {
          Id = competition.Id,
          Name = competition.Name,
          UserId = userId,
          Duration = competition.Duration,
          StartDate = competition.StartDate,
          Type = competition.Type,
          Description = competition.Description,
          Units = competition.Units,
          Target = competition.Participants.First(x => x.UserId == userId).Target,
          IsPrivate = competition.IsPrivate,
          Ledger = competition.Participants.First(x => x.UserId == userId).Ledger
        });
      }

      return goals;
    }

    public async Task<IReadOnlyList<UserGoal>> GetFriendPublicCompetitionGoals(Guid friendId)
    {
      var spec = new ParticipationsWithUserIdSpec(friendId);
      var participations = await _unitOfWork.Repository<CompetitionParticipant>().ListAsync(spec);
      var compIds = participations.Select(x => x.CompId).ToList();
      var compSpec = new CompetitionsInIdArraySpec(compIds, true);
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
          StartDate = competition.StartDate,
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
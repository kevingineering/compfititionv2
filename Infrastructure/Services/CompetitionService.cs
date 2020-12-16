using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entity;
using Core.Interfaces;
using Core.Specifications.Competitions;
using System.Linq;
using Core.Specifications.Participants;

namespace Infrastructure.Services
{
  public class CompetitionService
  //: AbstractService<Competition>, ICompetitionService
  {
    // private readonly IUnitOfWork _unitOfWork;

    // public CompetitionService(IUnitOfWork unitOfWork) : base(unitOfWork)
    // {
    //   _unitOfWork = unitOfWork;
    // }

    public Task<bool> AddCompetitionAsync(Competition comp, Guid userId)
    {
      throw new NotImplementedException();
      // var participant = new CompetitionParticipant(userId, comp.Id);
      // var admin = new CompetitionAdmin(userId, comp.Id);

      // _unitOfWork.Repository<Competition>().Add(comp);
      // _unitOfWork.Repository<CompetitionParticipant>().Add(participant);
      // _unitOfWork.Repository<CompetitionAdmin>().Add(admin);
      // var changes = await _unitOfWork.Complete();

      // if (changes <= 0)
      // {
      //   return false;
      // }

      // return true;
    }

    public Task<IReadOnlyList<Goal>> GetUserCompetitions(Guid userId)
    {
      throw new NotImplementedException();

      //get participations (includes competitions)
      // var spec = new UserParticipationsSpec(userId);
      // var participations = (await _unitOfWork.Repository<CompetitionParticipant>().ListAsync(spec)).OrderBy(x => x.CompGoal.StartTime);
      // var goals = new List<Goal>();
      // foreach (var participation in participations)
      // {
      //   goals.Add(new Goal
      //   {
      //     Id = participation.CompGoal.Id,
      //     Name = participation.CompGoal.Name,
      //     UserId = userId,
      //     Duration = participation.CompGoal.Duration,
      //     StartTime = participation.CompGoal.StartTime,
      //     Type = participation.CompGoal.Type,
      //     Description = participation.CompGoal.Description,
      //     Units = participation.CompGoal.Units,
      //     Target = participation.Target,
      //     IsPrivate = participation.CompGoal.IsPrivate,
      //     Ledger = participation.Ledger
      //   });
      // }

      // return goals;
    }

    public Task<IReadOnlyList<Goal>> GetFriendPublicCompetitions(Guid friendId)
    {
      throw new NotImplementedException();
      // var spec = new UserParticipationsSpec(friendId);
      // var participations = await _unitOfWork.Repository<CompetitionParticipant>().ListAsync(spec);
      // var competitionIds = participations.Select(x => x.CompId).ToList();
      // var compSpec = new PublicCompetitionsInIdArraySpec(competitionIds);
      // var competitions = await _unitOfWork.Repository<Competition>().ListAsync(compSpec);
      // var goals = new List<Goal>();
      // foreach (var competition in competitions)
      // {
      //   goals.Add(new Goal
      //   {
      //     Id = competition.Id,
      //     Name = competition.Name,
      //     UserId = friendId,
      //     Duration = competition.Duration,
      //     StartTime = competition.StartTime,
      //     Type = competition.Type,
      //     Description = competition.Description,
      //     Units = competition.Units,
      //     Target = competition.Participants.First(x => x.UserId == friendId).Target,
      //     IsPrivate = competition.IsPrivate,
      //     Ledger = competition.Participants.First(x => x.UserId == friendId).Ledger
      //   });
      // }

      // return goals;
    }
  }
}
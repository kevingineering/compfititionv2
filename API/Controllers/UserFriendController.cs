using System;
using System.Threading.Tasks;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications.Friends;
using Core.Specifications.Goals;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Core.Specifications.Users;
using System.Collections.Generic;
using API.DTOs.ReturnDTOs;

namespace API.Controllers
{
  public class UserFriendController : BaseController
  {
    // /userfriend
    //   POST    /:friendId          add friend (and delete friend request)
    //   GET     /                   get user friends
    //   GET     /:friendId          get friend's info, public goals, public competitions, and searchable friends
    //   DELETE  /:friendId          delete friend

    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly ICompetitionService _competitionService;

    public UserFriendController(IUnitOfWork unitOfWork, IMapper mapper, ICompetitionService competitionService)
    {
      _unitOfWork = unitOfWork;
      _mapper = mapper;
      _competitionService = competitionService;
    }

    [HttpPost("{friendId}")]
    public async Task<ActionResult> AddFriend(Guid friendId)
    {
      var userId = GetUserIdFromClaims();

      //ensure friendship does not already exist
      var friendshipSpec = new FriendshipWithBothIdsSpec(userId, friendId);
      var existingFriendship = await _unitOfWork.Repository<UserFriendship>().GetEntityWithSpec(friendshipSpec);
      if (existingFriendship != null)
      {
        return BadRequest(new ApiError(400, "You are already friends."));
      }

      //check request
      var requestSpec = new RequestsWithBothIdsSpec(userId, friendId);
      var existingRequest = await _unitOfWork.Repository<UserFriendRequest>().GetEntityWithSpec(requestSpec);
      if (existingRequest == null)
      {
        return NotFound(new ApiError(404, "Request not found."));
      }

      //ensure request is accepted by receiver
      if (existingRequest.SenderId == userId)
      {
        return Unauthorized(new ApiError(401, "You cannot accept a request you sent."));
      }

      //delete request and add friendship
      _unitOfWork.Repository<UserFriendRequest>().Delete(existingRequest);
      var friendship = new UserFriendship(userId, friendId);
      _unitOfWork.Repository<UserFriendship>().Add(friendship);
      var isAdded = await _unitOfWork.Complete();
      if (isAdded <= 0)
      {
        return BadRequest(new ApiError(400, "Error creating friendship."));
      }

      //get and return friend
      var friend = await _unitOfWork.Repository<User>().GetByIdAsync(friendId);
      if (friend == null)
      {
        return NotFound(new ApiError(404, "Friend not found."));
      }

      return Ok(_mapper.Map<User, DifferentUserReturnDTO>(friend));
    }

    [HttpGet]
    public async Task<ActionResult> GetFriends()
    {
      var userId = GetUserIdFromClaims();
      //TODO - do this all in database?
      var spec = new FriendshipWithUserIdSpec(userId);
      var friendshipIds = (await _unitOfWork.Repository<UserFriendship>().ListAsync(spec)).Select(x => x.User1Id != userId ? x.User1Id : x.User2Id).ToList();
      var usersSpec = new UsersInIdArraySpec(friendshipIds);
      var friends = await _unitOfWork.Repository<User>().ListAsync(usersSpec);
      return Ok(_mapper.Map<IReadOnlyList<User>, IReadOnlyList<DifferentUserReturnDTO>>(friends));
    }

    [HttpGet("{friendId}")]
    public async Task<ActionResult<UserFriendInfoReturnDTO>> GetFriendInfo(Guid friendId)
    {
      //verify users are friends
      var userId = GetUserIdFromClaims();
      var friendshipSpec = new FriendshipWithBothIdsSpec(userId, friendId);
      var existing = await _unitOfWork.Repository<UserFriendship>().GetEntityWithSpec(friendshipSpec);

      //get user
      var friend = await _unitOfWork.Repository<User>().GetByIdAsync(friendId);

      if (friend == null)
      {
        return NotFound(new ApiError(404, "User not found."));
      }

      //return basics if not friends with this user
      if (existing == null)
      {
        return new UserFriendInfoReturnDTO
        {
          IsFriend = false,
          Id = friend.Id,
          Email = friend.Email,
          Name = friend.Name,
          PastGoals = new List<GoalReturnDTO> { },
          ActiveGoals = new List<GoalReturnDTO> { },
          PastCompetitions = new List<GoalReturnDTO> { },
          ActiveCompetitions = new List<GoalReturnDTO> { },
          Friends = new List<UserReturnDTO> { }
        };
      }

      //get friend's public goals
      var goalSpec = new PublicGoalsWithUserIdSpec(friendId);
      var goals = await _unitOfWork.Repository<UserGoal>().ListAsync(goalSpec);
      var pastGoals = goals.Where(x => x.StartDate.AddDays(x.Duration).CompareTo(DateTime.Today) < 0).OrderBy(x => x.StartDate).ToList();
      var activeGoals = goals.Where(x => x.StartDate.AddDays(x.Duration).CompareTo(DateTime.Today) >= 0).OrderBy(x => x.StartDate).ToList();

      //get friend's public competitions
      var competitions = await _competitionService.GetFriendPublicCompetitionGoals(friendId);
      var pastCompetitions = competitions.Where(x => x.StartDate.AddDays(x.Duration).CompareTo(DateTime.Today) < 0).OrderBy(x => x.StartDate).ToList();
      var activeCompetitions = competitions.Where(x => x.StartDate.AddDays(x.Duration).CompareTo(DateTime.Today) >= 0).OrderBy(x => x.StartDate).ToList();

      //get friend's searchable friends
      var friendSpec = new FriendshipWithUserIdSpec(friendId);
      var friendships = await _unitOfWork.Repository<UserFriendship>().ListAsync(friendSpec);

      //get array of friendIds
      var friendIds = friendships.Select(x => x.User1Id == friendId ? x.User2Id : x.User1Id).Where(x => x != userId);

      //get searchable users
      var searchableFriendSpec = new SearchableFriendsWithUserIdInArraySpec(friendIds);
      var searchableFriends = await _unitOfWork.Repository<User>().ListAsync(searchableFriendSpec);

      return new UserFriendInfoReturnDTO
      {
        Id = friend.Id,
        Email = friend.Email,
        Name = friend.Name,
        PastGoals = _mapper.Map<IReadOnlyList<UserGoal>, IReadOnlyList<GoalReturnDTO>>(pastGoals),
        ActiveGoals = _mapper.Map<IReadOnlyList<UserGoal>, IReadOnlyList<GoalReturnDTO>>(activeGoals),
        PastCompetitions = _mapper.Map<IReadOnlyList<UserGoal>, IReadOnlyList<GoalReturnDTO>>(pastCompetitions),
        ActiveCompetitions = _mapper.Map<IReadOnlyList<UserGoal>, IReadOnlyList<GoalReturnDTO>>(activeCompetitions),
        Friends = _mapper.Map<IReadOnlyList<User>, IReadOnlyList<UserReturnDTO>>(searchableFriends),
        IsFriend = true
      };
    }

    [HttpDelete("{friendId}")]
    public async Task<ActionResult> DeleteFriend(Guid friendId)
    {
      var userId = GetUserIdFromClaims();
      var spec = new FriendshipWithBothIdsSpec(userId, friendId);
      var friendship = await _unitOfWork.Repository<UserFriendship>().GetEntityWithSpec(spec);
      if (friendship == null)
      {
        return NotFound(new ApiError(404, "Request not found."));
      }

      _unitOfWork.Repository<UserFriendship>().Delete(friendship);
      var changes = await _unitOfWork.Complete();
      if (changes <= 0)
      {
        return BadRequest(new ApiError(400, "Error deleting friendship."));
      }

      return NoContent();
    }
  }
}

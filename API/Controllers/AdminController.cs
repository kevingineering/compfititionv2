using System;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Models.Response;
using Core.Entity;
using Core.Interfaces;
using Core.Specifications.AdminRequests;
using Core.Specifications.Admins;
using Core.Specifications.Competitions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Helpers;

namespace API.Controllers
{
  public class AdminController : ParentController
  {
    // /admin
    //   POST    /:competitionId              add admin (search for request and delete)
    //   DELETE  /:competitionId              delete admin

    // private readonly IUnitOfWork _unitOfWork;

    // public AdminController(IUnitOfWork unitOfWork)
    // {
    //   _unitOfWork = unitOfWork;
    // }

    [HttpPost("{competitionId}")]
    public Task<ActionResult<CompetitionResponse>> AddAdminToCompetition(Guid competitionId)
    {
      throw new NotImplementedException();

      // var userId = GetUserIdFromClaims();

      // //verify request exists
      // var spec = new AdminRequestSpec(userId, competitionId);
      // var request = await _unitOfWork.Repository<CompetitionAdminRequest>().GetEntityWithSpec(spec);

      // if (request == null)
      // {
      //   return NotFound(new ApiError(404, "Request does not exist."));
      // }

      // //add admin and delete request
      // var admin = new CompetitionAdmin(userId, competitionId);
      // _unitOfWork.Repository<CompetitionAdmin>().Add(admin);
      // _unitOfWork.Repository<CompetitionAdminRequest>().Delete(request);

      // var isAdded = await _unitOfWork.Complete();
      // if (isAdded <= 0)
      // {
      //   return BadRequest("Error adding admin.");
      // }

      // var compSpec = new CompetitionAsAdminSpec(competitionId);
      // var competition = await _unitOfWork.Repository<Competition>().GetEntityWithSpec(compSpec);

      // return Ok(CompetitionMapper.MapCompetition(true, competition, userId));
    }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpDelete("{competitionId}")]
    public Task<ActionResult<CompetitionResponse>> RemoveAdminFromCompetition(Guid competitionId)
    {
      throw new NotImplementedException();

      //   var userId = GetUserIdFromClaims();

      //   //get admins
      //   var adminsSpec = new CompetitionAdminsSpec(competitionId);
      //   var admins = await _unitOfWork.Repository<CompetitionAdmin>().ListAsync(adminsSpec);

      //   //if user is only admin, either:
      //   //  promote user who has been asked to be admin OR
      //   //  inform user they must pass the responsibilites to someone else
      //   if (admins.Count == 1)
      //   {
      //     var spec = new AdminRequestsSpec(competitionId);
      //     var adminRequests = await _unitOfWork.Repository<CompetitionAdminRequest>().ListAsync(spec);

      //     if (adminRequests.Count == 0)
      //     {
      //       return Unauthorized(new ApiError(403, "You are the only admin in this competition. Ask someone else to be an admin before relinquishing your responsibilitites."));
      //     }

      //     var newAdmin = new CompetitionAdmin(adminRequests[0].ParticipantId, competitionId);
      //     _unitOfWork.Repository<CompetitionAdmin>().Add(newAdmin);
      //     _unitOfWork.Repository<CompetitionAdminRequest>().Delete(adminRequests[0]);
      //   }

      //   var admin = admins.First(x => x.UserId == userId);

      //   _unitOfWork.Repository<CompetitionAdmin>().Delete(admin);

      //   var isDeleted = await _unitOfWork.Complete();

      //   if (isDeleted <= 0)
      //   {
      //     return BadRequest(new ApiError(400, "Error removing participant."));
      //   }

      //   var compSpec = new CompetitionAsAdminSpec(competitionId);
      //   var competition = await _unitOfWork.Repository<Competition>().GetEntityWithSpec(compSpec);

      //   return Ok(CompetitionMapper.MapCompetition(false, competition, userId));
    }
  }
}
using System;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.ReturnDTOs;
using API.Errors;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications.AdminRequests;
using Core.Specifications.Admins;
using Core.Specifications.Competitions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Helpers;

namespace API.Controllers
{
  public class AdminController : BaseController
  {
    // /admin
    //   POST    /:compId              add admin (search for request and delete)
    //   DELETE  /:compId              delete admin

    private readonly IUnitOfWork _unitOfWork;

    public AdminController(IUnitOfWork unitOfWork)
    {
      _unitOfWork = unitOfWork;
    }

    [HttpPost("{compId}")]
    public async Task<ActionResult<CompetitionReturnDTO>> AddAdminToCompetition(Guid compId)
    {
      var userId = GetUserIdFromClaims();

      //verify request exists
      var spec = new AdminRequestSpec(userId, compId);
      var request = await _unitOfWork.Repository<CompetitionAdminRequest>().GetEntityWithSpec(spec);

      if (request == null)
      {
        return NotFound(new ApiError(404, "Request does not exist."));
      }

      //add admin and delete request
      var admin = new CompetitionAdmin(compId, userId);
      _unitOfWork.Repository<CompetitionAdmin>().Add(admin);
      _unitOfWork.Repository<CompetitionAdminRequest>().Delete(request);

      var isAdded = await _unitOfWork.Complete();
      if (isAdded <= 0)
      {
        return BadRequest("Error adding admin.");
      }

      var compSpec = new CompetitionAsAdminSpec(compId);
      var competition = await _unitOfWork.Repository<CompetitionGoal>().GetEntityWithSpec(compSpec);

      return Ok(CompetitionMapper.MapCompetition(true, competition, userId));
    }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpDelete("{compId}")]
    public async Task<ActionResult<CompetitionReturnDTO>> RemoveAdminFromCompetition(Guid compId)
    {
      var userId = GetUserIdFromClaims();

      //get admins
      var adminsSpec = new CompetitionAdminsSpec(compId);
      var admins = await _unitOfWork.Repository<CompetitionAdmin>().ListAsync(adminsSpec);

      //if user is only admin, either:
      //  promote user who has been asked to be admin OR
      //  inform user they must pass the responsibilites to someone else
      if (admins.Count == 1)
      {
        var spec = new AdminRequestsSpec(compId);
        var adminRequests = await _unitOfWork.Repository<CompetitionAdminRequest>().ListAsync(spec);

        if (adminRequests.Count == 0)
        {
          return Unauthorized(new ApiError(403, "You are the only admin in this competition. Ask someone else to be an admin before relinquishing your responsibilitites."));
        }

        var newAdmin = new CompetitionAdmin(compId, adminRequests[0].ParticipantId);
        _unitOfWork.Repository<CompetitionAdmin>().Add(newAdmin);
        _unitOfWork.Repository<CompetitionAdminRequest>().Delete(adminRequests[0]);
      }

      var admin = admins.First(x => x.UserId == userId);

      _unitOfWork.Repository<CompetitionAdmin>().Delete(admin);

      var isDeleted = await _unitOfWork.Complete();

      if (isDeleted <= 0)
      {
        return BadRequest(new ApiError(400, "Error removing participant."));
      }

      var compSpec = new CompetitionAsAdminSpec(compId);
      var competition = await _unitOfWork.Repository<CompetitionGoal>().GetEntityWithSpec(compSpec);

      return Ok(CompetitionMapper.MapCompetition(false, competition, userId));
    }
  }
}
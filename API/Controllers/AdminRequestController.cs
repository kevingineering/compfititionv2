using System;
using System.Threading.Tasks;
using Core.Entity;
using Core.Interfaces;
using Core.Specifications.AdminRequests;
using Core.Specifications.Admins;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class AdminRequestController : ParentController
  {
    // /adminrequest
    //   POST    /:userId/:competitionId      send request (as admin)
    //   DELETE  /:competitionId              delete request (as user)
    //   DELETE  /:userId/:competitionId      delete request (as admin)
    // private readonly IGenericService<CompetitionAdminRequest> _adminRequestService;
    // private readonly IGenericService<CompetitionAdmin> _adminService;

    // public AdminRequestController(IGenericService<CompetitionAdminRequest> adminRequestService, IGenericService<CompetitionAdmin> adminService)
    // {
    //   _adminRequestService = adminRequestService;
    //   _adminService = adminService;
    // }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpPost("{userId}/{competitionId}")]
    public Task<ActionResult> AddRequest(Guid userId, Guid competitionId)
    {
      throw new NotImplementedException();
      //competition exists if authorization passes

      //verify request does not exist
      // var spec = new AdminRequestSpec(userId, competitionId);
      // var existingRequest = await _adminRequestService.GetEntityWithSpecAsync(spec);

      // if (existingRequest != null)
      // {
      //   return BadRequest(new ApiError(400, "Request already exists."));
      // }

      // //verify user is not already admin
      // var adminSpec = new AdminSpec(userId, competitionId);
      // var existingAdmin = await _adminService.GetEntityWithSpecAsync(adminSpec);

      // if (existingAdmin != null)
      // {
      //   return BadRequest(new ApiError(400, "User already admin."));
      // }

      // //add request
      // var request = new CompetitionAdminRequest(userId, competitionId);
      // var isAdded = await _adminRequestService.AddAsync(request);

      // if (isAdded == null)
      // {
      //   return BadRequest(new ApiError(400, "Problem creating request."));
      // }

      // return NoContent();
    }

    [HttpDelete("{competitionId}")]
    public Task<ActionResult> DeleteRequestAsUser(Guid competitionId)
    {
      throw new NotImplementedException();

      // var userId = GetUserIdFromClaims();

      // //verify request exists
      // var spec = new AdminRequestSpec(userId, competitionId);
      // var existingRequest = await _adminRequestService.GetEntityWithSpecAsync(spec);

      // if (existingRequest == null)
      // {
      //   return NotFound(new ApiError(404, "Request not found."));
      // }

      // //delete request
      // var isDeleted = await _adminRequestService.DeleteAsync(existingRequest);

      // if (!isDeleted)
      // {
      //   return BadRequest(new ApiError(400, "Error removing request."));
      // }

      // return NoContent();
    }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpDelete("{userId}/{competitionId}")]
    public Task<ActionResult> DeleteRequestAsAdmin(Guid userId, Guid competitionId)
    {
      throw new NotImplementedException();

      // //verify request exists
      // var spec = new AdminRequestSpec(userId, competitionId);
      // var existingRequest = await _adminRequestService.GetEntityWithSpecAsync(spec);

      // if (existingRequest == null)
      // {
      //   return NotFound(new ApiError(404, "Request not found."));
      // }

      // //delete request
      // var isDeleted = await _adminRequestService.DeleteAsync(existingRequest);

      // if (!isDeleted)
      // {
      //   return BadRequest(new ApiError(400, "Error removing request."));
      // }

      // return NoContent();
    }
  }
}
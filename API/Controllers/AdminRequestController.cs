using System;
using System.Threading.Tasks;
using API.DTOs.ReturnDTOs;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications.AdminRequests;
using Core.Specifications.Admins;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class AdminRequestController : BaseController
  {
    // /adminrequest
    //   POST    /:userId/:compId      send request (as admin)
    //   DELETE  /:compId              delete request (as user)
    //   DELETE  /:userId/:compId      delete request (as admin)
    private readonly IGenericService<CompetitionAdminRequest> _adminRequestService;
    private readonly IGenericService<CompetitionAdmin> _adminService;
    private readonly IMapper _mapper;

    public AdminRequestController(IGenericService<CompetitionAdminRequest> adminRequestService, IGenericService<CompetitionAdmin> adminService, IMapper mapper)
    {
      _adminRequestService = adminRequestService;
      _adminService = adminService;
      _mapper = mapper;
    }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpPost("{userId}/{compId}")]
    public async Task<ActionResult<AdminRequestDTO>> AddRequest(Guid userId, Guid compId)
    {
      //competition exists if authorization passes

      //verify request does not exist
      var spec = new AdminRequestSpec(userId, compId);
      var existingRequest = await _adminRequestService.GetEntityWithSpecAsync(spec);

      if (existingRequest != null)
      {
        return BadRequest(new ApiError(400, "Request already exists."));
      }

      //verify user is not already admin
      var adminSpec = new AdminSpec(userId, compId);
      var existingAdmin = await _adminService.GetEntityWithSpecAsync(adminSpec);

      if (existingAdmin != null)
      {
        return BadRequest(new ApiError(400, "User already admin."));
      }

      //add request
      var request = new CompetitionAdminRequest(userId, compId);
      var isAdded = await _adminRequestService.AddAsync(request);

      if (isAdded == null)
      {
        return BadRequest(new ApiError(400, "Problem creating request."));
      }

      return Ok(_mapper.Map<CompetitionAdminRequest, AdminRequestDTO>(request));
    }

    [HttpDelete("{compId}")]
    public async Task<ActionResult> DeleteRequestAsUser(Guid compId)
    {
      var userId = GetUserIdFromClaims();

      //verify request exists
      var spec = new AdminRequestSpec(userId, compId);
      var existingRequest = await _adminRequestService.GetEntityWithSpecAsync(spec);

      if (existingRequest == null)
      {
        return NotFound(new ApiError(404, "Request not found."));
      }

      //delete request
      var isDeleted = await _adminRequestService.DeleteAsync(existingRequest);

      if (!isDeleted)
      {
        return BadRequest(new ApiError(400, "Error removing request."));
      }

      return NoContent();
    }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpDelete("{userId}/{compId}")]
    public async Task<ActionResult> DeleteRequestAsAdmin(Guid userId, Guid compId)
    {
      //verify request exists
      var spec = new AdminRequestSpec(userId, compId);
      var existingRequest = await _adminRequestService.GetEntityWithSpecAsync(spec);

      if (existingRequest == null)
      {
        return NotFound(new ApiError(404, "Request not found."));
      }

      //delete request
      var isDeleted = await _adminRequestService.DeleteAsync(existingRequest);

      if (!isDeleted)
      {
        return BadRequest(new ApiError(400, "Error removing request."));
      }

      return NoContent();
    }
  }
}
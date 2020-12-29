using System;
using System.Threading.Tasks;
using Infrastructure.Models.Response;
using Infrastructure.Signatures;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class AdminController : ParentController
  {
    private readonly IAdminService _adminService;

    public AdminController(IAdminService adminService)
    {
      _adminService = adminService;
    }

    [HttpPost("{competitionId}")]
    public async Task<ActionResult<CompetitionResponse>> AddAdminToCompetition(Guid competitionId)
    {
      var competitionResponse = await _adminService.AddAdminToCompetition(UserId, competitionId);
      return Ok(competitionResponse);
    }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpDelete("{competitionId}")]
    public async Task<ActionResult<CompetitionResponse>> RemoveAdminFromCompetition(Guid competitionId)
    {
      var competitionResponse = await _adminService.RemoveAdminFromCompetition(UserId, competitionId);
      return Ok(competitionResponse);
    }
  }
}
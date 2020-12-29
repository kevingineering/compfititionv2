using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Infrastructure.Models.Request;
using Infrastructure.Models.Response;
using Infrastructure.Signatures;

namespace API.Controllers
{
  public class CompetitionController : ParentController
  {
    private readonly ICompetitionService _competitionService;

    public CompetitionController(ICompetitionService competitionService)
    {
      _competitionService = competitionService;
    }

    [HttpPost]
    public async Task<ActionResult<CompetitionResponse>> AddCompetition(CompetitionRequest request)
    {
      return Ok(await _competitionService.AddCompetition(UserId, request));
    }

    [HttpGet("{competitionId}")]
    public async Task<ActionResult<CompetitionResponse>> GetCompetition(Guid competitionId)
    {
      return Ok(await _competitionService.GetCompetition(UserId, competitionId));
    }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpPatch("{competitionId}")]
    public async Task<ActionResult<CompetitionResponse>> UpdateCompetition(Guid competitionId, CompetitionRequest request)
    {
      var competition = await _competitionService.UpdateCompetition(competitionId, request);
      return Ok(competition);
    }

    [Authorize(Policy = "IsCompetitionAdmin")]
    [HttpDelete("{competitionId}")]
    public async Task<ActionResult> DeleteCompetition(Guid competitionId)
    {
      await _competitionService.DeleteCompetition(competitionId);
      return NoContent();
    }
  }
}
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs.InputDTOs;
using API.DTOs.ReturnDTOs;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications.Competitions;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class LetterController : BaseController
  {
    //TODO 

    // /letter
    //   POST    /                    add new letter
    //   GET     /:letterId           get letter
    //   GET     /                    get user letters
    //   GET     /:compId             get competition letters
    //   PATCH   /:compId             update competition letter expiration date
    //   DELETE  /:letterId           delete letter

    private readonly IMapper _mapper;
    // private readonly ICompetitionService _competitionService;
    private readonly IGenericService<CompetitionLetter> _letterService;
    // private readonly IGenericService<CompetitionParticipant> _participantService;
    // private readonly IGenericService<CompetitionAdmin> _adminService;

    public LetterController(IMapper mapper, ICompetitionService competitionService, IGenericService<CompetitionLetter> letterService, IGenericService<CompetitionParticipant> participantService, IGenericService<CompetitionAdmin> adminService)
    {
      _mapper = mapper;
      // _competitionService = competitionService;
      _letterService = letterService;
      // _participantService = participantService;
      // _adminService = adminService;
    }

    [HttpGet]
    public async Task<ActionResult<LetterReturnDTO>> GetCompetitions()
    {
      var userId = GetUserIdFromClaims();
      var spec = new LettersWithUserIdSpec(userId);
      var letters = await _letterService.GetListWithSpecAsync(spec);
      return Ok(_mapper.Map<IReadOnlyList<CompetitionLetter>, IReadOnlyList<LetterReturnDTO>>(letters));
    }

    //TODO
    //add letter
    //  ToUser - Tell User an Admin invited user to join competition
    //  FromUser - Tell Admin a User asked to join competition
    //  RequestAdmin - Tell User an Admin asked them to be a competition Admin
    [HttpPost]
    public Task<ActionResult> SendLetter(LetterInputDTO letterDTO)
    {
      throw new NotImplementedException();
    }

    [HttpDelete("{letterId}")]
    public async Task<ActionResult> DeleteOrRejectLetter(Guid letterId)
    {
      var userId = GetUserIdFromClaims();
      var letter = await _letterService.GetByIdAsync(letterId);

      if (letter == null)
      {
        return NotFound(new ApiError(404, "Letter not found."));
      }

      if (letter.ReceiverId != userId)
      {
        return Unauthorized(new ApiError(403, "This letter is not about you."));
      }

      var isDeleted = await _letterService.DeleteAsync(letter);
      if (!isDeleted)
      {
        return BadRequest(new ApiError(400, "Error deleting competition."));
      }

      return NoContent();
    }
  }
}
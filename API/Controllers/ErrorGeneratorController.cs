using System;
using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [AllowAnonymous]
  [ApiExplorerSettings(IgnoreApi = true)] //make Swagger ignore
  public class ErrorGeneratorController : BaseController
  {
    private readonly DataContext _context;

    public ErrorGeneratorController(DataContext context)
    {
      _context = context;
    }

    [HttpGet("notfound")]
    public ActionResult GetNotFoundRequest()
    {
      var nullObject = _context.Goals.Find(new Guid());
      if (nullObject == null)
      {
        return NotFound(new ApiError(404));
      }

      return Ok();
    }

    [HttpGet("servererror")]
    public ActionResult GetServerError()
    {
      var nullObject = _context.Goals.Find(new Guid());
      var cantStringNull = nullObject.ToString();
      return Ok();
    }

    [HttpGet("badrequest")]
    public ActionResult GetBadRequest()
    {
      return BadRequest(new ApiError(400));
    }

    [HttpGet("badrequest/{id}")]
    public ActionResult GetBadRequest(int id)
    {
      //pass in string
      return Ok();
    }
  }
}
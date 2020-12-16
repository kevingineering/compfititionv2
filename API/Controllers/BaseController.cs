using System;
using System.Linq;
using System.Security.Claims;
using Core.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ParentController : ControllerBase
  {
    internal Guid UserId
    {
      get
      {
        var userId = this.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
          throw new ApiError(401, "Token not valid.");
        }

        return (Guid.Parse(userId));
      }
    }
  }
}
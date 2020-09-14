using System;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class BaseController : ControllerBase
  {
    //Note: if userId or token don't exist, request won't pass authentication
    protected Guid GetUserIdFromClaims()
    {
      var userId = this.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
      return Guid.Parse(userId);
    }

    protected string GetEmailFromClaims()
    {
      return this.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
    }
  }
}
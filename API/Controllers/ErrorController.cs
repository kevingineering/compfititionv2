using Core.Errors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [AllowAnonymous]
  [Route("errors/{code}")]
  public class ErrorController : ParentController
  {
    public IActionResult Error(int code)
    {
      throw new ApiError(code);
    }
  }
}
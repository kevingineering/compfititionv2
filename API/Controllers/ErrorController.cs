using API.Errors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [AllowAnonymous]
  [Route("errors/{code}")]
  [ApiExplorerSettings(IgnoreApi = true)] //tell Swagger to ignore
  public class ErrorController : BaseController
  {
    public IActionResult Error(int code)
    {
      return new ObjectResult(new ApiError(code));
    }
  }
}
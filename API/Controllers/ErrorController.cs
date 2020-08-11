using API.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
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

namespace Core.Errors
{
  public class ApiError : System.Exception
  {
    public int StatusCode { get; set; }
    public override string Message { get; }

    public ApiError(int statusCode, string message = null)
    {
      StatusCode = statusCode;
      Message = message ?? GetDefaultMessageByStatusCode(statusCode);
    }

    private string GetDefaultMessageByStatusCode(int statusCode)
    {
      return statusCode switch
      {
        400 => "Something was wrong with your request.",
        401 => "You are not authorized to perform this action.",
        403 => "You are forbidden from performing this action.",
        404 => "Resource was not found.",
        500 => "Something went wrong on the server.",
        _ => null
      };
    }
  }
}
namespace API.Errors
{
  public class ApiError
  {
    public int StatusCode { get; set; }
    public string Message { get; set; }

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
        404 => "Resource was not found.",
        500 => "Something went wrong on the server.",
        _ => null
      };
    }
  }
}
namespace Core.Errors
{
  public class ApiServerErrorWithStackTrace
  {
    public int StatusCode { get; set; }
    public string Message { get; set; }
    public string StackTrace { get; }

    public ApiServerErrorWithStackTrace(int statusCode, string message = null, string stackTrace = null)
    {
      StatusCode = statusCode;
      Message = message;
      StackTrace = stackTrace;
    }
  }
}
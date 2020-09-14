namespace API.Errors
{
  public class ApiServerErrorWithStackTrace : ApiError
  {
    public string StackTrace { get; }

    public ApiServerErrorWithStackTrace(int statusCode, string message = null, string stackTrace = null) : base(statusCode, message)
    {
      StackTrace = stackTrace;
    }
  }
}
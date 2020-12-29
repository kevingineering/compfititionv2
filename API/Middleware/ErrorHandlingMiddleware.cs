using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
  public class ErrorHandlingMiddleware
  {
    private readonly RequestDelegate _next;
    private readonly ILogger<ErrorHandlingMiddleware> _logger;
    private readonly IHostEnvironment _env;

    public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger, IHostEnvironment env)
    {
      _env = env;
      _logger = logger;
      _next = next;
    }

    //InvokeAsync is required method for custom middleware 
    public async Task InvokeAsync(HttpContext context)
    {
      try
      {
        await _next(context);
      }
      //ApiError is child of Exception 
      //We primarily throw ApiError, but Exceptions may also be thrown
      //either way we want status code if it exists
      catch (ApiError ex)
      {
        await ConfigureResponse(context, ex.StatusCode, ex);
      }
      catch (Exception ex)
      {
        //we are primarily throwing ApiError which has status code and message
        var ae = ex.InnerException as ApiError;
        var statusCode = ae != null ? ae.StatusCode : (int)HttpStatusCode.InternalServerError;
        var exception = ae != null ? ae : ex;

        await ConfigureResponse(context, statusCode, exception);
      }
    }

    private async Task ConfigureResponse(HttpContext context, int statusCode, Exception ex)
    {
      _logger.LogError(ex, ex.Message);
      context.Response.ContentType = "application/json";
      context.Response.StatusCode = statusCode;

      //send back stack trace if in dev
      var response = _env.IsDevelopment()
          ? new ApiServerErrorWithStackTrace(statusCode, ex.Message, ex.StackTrace.ToString())
          : new ApiServerErrorWithStackTrace(statusCode);

      //use camelCase to match other errors, otherwise returns PascalCase
      var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
      var json = JsonSerializer.Serialize(response, options);
      await context.Response.WriteAsync(json);
    }
  }
}
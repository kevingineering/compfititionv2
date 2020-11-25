using System.Linq;
using API.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
  public static class ApplicationServiceExtensions
  {
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
      services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
      services.AddScoped<IUnitOfWork, UnitOfWork>();
      services.AddScoped(typeof(IGenericService<>), typeof(GenericService<>));
      services.AddScoped<ITokenService, TokenService>();
      services.AddScoped<IPasswordService, PasswordService>();
      services.AddScoped<ICompetitionService, CompetitionService>();

      //Configures default ApiController behavior so we can more easily handle validation errors
      //Validation errors are pulled from model state and put into single array that is returned on our custom error
      //Must come after .AddControllers()
      //https://www.udemy.com/course/learn-to-build-an-e-commerce-app-with-net-core-and-angular/learn/lecture/18137238#overview
      services.Configure<ApiBehaviorOptions>(options =>
      {
        options.InvalidModelStateResponseFactory = actionContext =>
        {
          //ModelState is dictionary object
          var errors = actionContext.ModelState
            .Where(e => e.Value.Errors.Count > 0)
            .SelectMany(x => x.Value.Errors)
            .Select(x => x.ErrorMessage).ToArray();

          var errorResponse = new ApiValidationError
          {
            Errors = errors
          };

          return new BadRequestObjectResult(errorResponse);
        };
      });

      return services;
    }
  }
}
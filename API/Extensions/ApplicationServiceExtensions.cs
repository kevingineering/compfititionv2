using System.Linq;
using Core.Errors;
using Core.Interfaces;
using Core.Interfaces.Repos;
using Data.Repos;
using Infrastructure.Services;
using Infrastructure.Signatures;
using Infrastructure.Utility;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
  public static class ApplicationServiceExtensions
  {
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
      //Is there a way to automatically register these services?
      //Repo
      services.AddScoped<IUserRepo, UserRepo>();
      services.AddScoped<IChallengeRepo, ChallengeRepo>();
      services.AddScoped<IGoalRepo, GoalRepo>();
      services.AddScoped<IFriendRequestRepo, FriendRequestRepo>();
      services.AddScoped<IFriendshipRepo, FriendshipRepo>();
      services.AddScoped<ICompetitionRepo, CompetitionRepo>();
      services.AddScoped<IParticipantRepo, ParticipantRepo>();
      services.AddScoped<IParticipationRequestRepo, ParticipationRequestRepo>();
      services.AddScoped<IInvitationRepo, InvitationRepo>();
      services.AddScoped<IAdminRepo, AdminRepo>();
      services.AddScoped<IAdminRequestRepo, AdminRequestRepo>();

      //Services
      services.AddScoped<IUserService, UserService>();
      services.AddScoped<IGoalService, GoalService>();
      services.AddScoped<IFriendRequestService, FriendRequestService>();
      services.AddScoped<IFriendshipService, FriendshipService>();
      services.AddScoped<ICompetitionService, CompetitionService>();
      services.AddScoped<IParticipantService, ParticipantService>();
      services.AddScoped<IParticipationRequestService, ParticipationRequestService>();
      services.AddScoped<IInvitationService, InvitationService>();
      services.AddScoped<IAdminService, AdminService>();
      services.AddScoped<IAdminRequestService, AdminRequestService>();
      services.AddScoped<IMappingService, MappingService>();

      //Utilities
      services.AddScoped<ITokenUtility, TokenUtility>();
      services.AddScoped<IPasswordUtility, PasswordUtility>();

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

          var errorResponse = new ApiValidationError(errors);
          return new BadRequestObjectResult(errorResponse);
        };
      });

      return services;
    }
  }
}
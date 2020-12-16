using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Core.Entity;
using Core.Errors;
using Core.Interfaces;
using Infrastructure.Signatures;
using Microsoft.AspNetCore.Authorization;

namespace Infrastructure.SecurityPolicy
{
  public class IsActiveUserRequirement : IAuthorizationRequirement
  {

  }

  public class IsActiveUserRequirementHandler : AuthorizationHandler<IsActiveUserRequirement>
  {
    private readonly IUserService _userService;

    public IsActiveUserRequirementHandler(IUserService userService)
    {
      _userService = userService;
    }

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsActiveUserRequirement requirement)
    {
      try
      {

        System.Console.WriteLine("CHECKING IF USER IS ACTIVE...");

        var userId = context.User?.Claims?
          .SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

        if (userId != null)
        {
          var userIdGuid = Guid.Parse(userId);

          var user = _userService.GetUser(userIdGuid).Result;

          if (user != null)
          {
            context.Succeed(requirement);
            System.Console.WriteLine("USER IS ACTIVE!");
          }
        }

        return Task.CompletedTask;
      }
      catch (ApiError ex)
      {
        throw ex;
      }
    }
  }
}
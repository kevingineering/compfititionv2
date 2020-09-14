using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace Infrastructure.SecurityPolicy
{
  public class IsActiveUserRequirement : IAuthorizationRequirement
  {

  }

  public class IsActiveUserRequirementHandler : AuthorizationHandler<IsActiveUserRequirement>
  {
    private readonly IGenericService<User> _userService;

    public IsActiveUserRequirementHandler(IGenericService<User> userService)
    {
      _userService = userService;
    }

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsActiveUserRequirement requirement)
    {
      System.Console.WriteLine("Test");

      var userId = context.User?.Claims?.SingleOrDefault(
          x => x.Type == ClaimTypes.NameIdentifier)?.Value;

      if (userId != null)
      {
        var userIdGuid = Guid.Parse(userId);

        var user = _userService.GetByIdAsync(userIdGuid).Result;

        if (user != null)
        {
          context.Succeed(requirement);
        }
      }

      return Task.CompletedTask;
    }
  }
}
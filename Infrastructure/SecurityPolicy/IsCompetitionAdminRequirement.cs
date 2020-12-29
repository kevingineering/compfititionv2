using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Core.Interfaces.Repos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.SecurityPolicy
{
  public class IsCompetitionAdminRequirement : IAuthorizationRequirement
  {

  }

  public class IsCompetitionAdminRequirementHandler : AuthorizationHandler<IsCompetitionAdminRequirement>
  {
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IAdminRepo _adminRepo;

    public IsCompetitionAdminRequirementHandler(IHttpContextAccessor httpContextAccessor, IAdminRepo adminRepo)
    {
      _adminRepo = adminRepo;
      _httpContextAccessor = httpContextAccessor;
    }

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsCompetitionAdminRequirement requirement)
    {
      System.Console.WriteLine("CHECKING IF USER IS COMPETITION ADMIN...");
      var userId = context.User?.Claims?
        .SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

      var path = _httpContextAccessor.HttpContext.Request.Path.ToString();

      var competitionId = path.Split('/').Last();

      if (userId != null && competitionId != null)
      {
        var admin = _adminRepo
          .Get(Guid.Parse(userId), Guid.Parse(competitionId))
          .Result;

        if (admin != null)
        {
          context.Succeed(requirement);
          System.Console.WriteLine("USER IS COMPETITION ADMIN!");
        }
      }

      return Task.CompletedTask;
    }
  }
}
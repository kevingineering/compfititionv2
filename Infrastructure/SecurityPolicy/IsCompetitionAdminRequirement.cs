using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Specifications.Competitions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.SecurityPolicy
{
  public class IsCompetitionAdminRequirement : IAuthorizationRequirement
  {

  }

  public class IsCompetitionAdminRequirementHandler : AuthorizationHandler<IsCompetitionAdminRequirement>
  {
    // private readonly IHttpContextAccessor _httpContextAccessor;
    // private readonly ICompetitionService _competitionService;

    // public IsCompetitionAdminRequirementHandler(IHttpContextAccessor httpContextAccessor, ICompetitionService competitionService)
    // {
    //   _competitionService = competitionService;
    //   _httpContextAccessor = httpContextAccessor;
    // }

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsCompetitionAdminRequirement requirement)
    {
      // System.Console.WriteLine("CHECKING IF USER IS COMPETITION ADMIN...");
      // var userId = context.User?.Claims?
      //   .SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

      // var path = _httpContextAccessor.HttpContext.Request.Path.ToString();

      // var competitionId = path.Split('/').Last();

      // if (userId != null && competitionId != null)
      // {
      //   var userIdGuid = Guid.Parse(userId);
      //   var competitionIdGuid = Guid.Parse(competitionId);

      //   var spec = new CompetitionAsAdminSpec(competitionIdGuid);
      //   var competition = _competitionService.GetEntityWithSpecAsync(spec).Result;

      //   if (competition != null)
      //   {
      //     var isAdmin = competition.Admins
      //       .SingleOrDefault(x => x.CompId == competitionIdGuid && x.UserId == userIdGuid) != null;

      //     if (isAdmin) context.Succeed(requirement);
      //     System.Console.WriteLine("USER IS COMPETITION ADMIN!");
      //   }
      // }

      return Task.CompletedTask;
    }
  }
}
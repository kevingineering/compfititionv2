using System;
using System.Text;
using Infrastructure.SecurityPolicy;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
  public static class AuthServiceExtensions
  {
    public static IServiceCollection AddAuthPolicies(this IServiceCollection services, IConfiguration config)
    {
      services.AddHttpContextAccessor();

      services.AddAuthorization(options =>
      {
        //ensures token is valid and is from current (not deleted) user
        options.AddPolicy("IsActiveUser", policy =>
        {
          policy.Requirements.Add(new IsActiveUserRequirement());
        });

        //requires compId in route
        options.AddPolicy("IsCompetitionAdmin", policy =>
        {
          policy.Requirements.Add(new IsActiveUserRequirement());
          policy.Requirements.Add(new IsCompetitionAdminRequirement());
        });

        //default authorization policy
        options.FallbackPolicy = new AuthorizationPolicyBuilder().AddRequirements(new IsActiveUserRequirement()).Build();
      });

      services.AddTransient<IAuthorizationHandler, IsActiveUserRequirementHandler>();

      services.AddTransient<IAuthorizationHandler, IsCompetitionAdminRequirementHandler>();

      //checks for token and gets claims from token
      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
      {
        options.TokenValidationParameters = new TokenValidationParameters
        {
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token:Key"])),
          ValidateAudience = false,
          ValidIssuer = config["Token:Issuer"],
          ValidateIssuer = true,
          ValidateLifetime = true,
          ClockSkew = TimeSpan.Zero
        };
      });

      return services;
    }
  }
}
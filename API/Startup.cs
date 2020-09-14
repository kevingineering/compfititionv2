using System;
using System.Linq;
using System.Text;
using API.Errors;
using API.Helpers;
using API.Middleware;
using AutoMapper;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.SecurityPolicy;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace API
{
  public class Startup
  {
    private readonly IConfiguration _config;

    public Startup(IConfiguration config)
    {
      _config = config;
    }

    //DI container
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddCors(opt =>
      {
        opt.AddPolicy("CorsPolicy", policy =>
        {
          policy
            .AllowAnyHeader()
            .AllowAnyMethod()
            .WithOrigins("http://localhost:3000");
        });
      });

      //Authorization policy means everything requires authorization unless allow anonymous
      services.AddControllers(options =>
      {
        var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
        options.Filters.Add(new AuthorizeFilter(policy));
      });

      services.AddAutoMapper(typeof(MappingProfiles));

      services.AddDbContext<DataContext>(x =>
      {
        x.UseSqlite(_config.GetConnectionString("DefaultConnection"));
      });

      services.AddAuthorization(options =>
      {
        options.AddPolicy("IsActiveUser", policy =>
        {
          policy.Requirements.Add(new IsActiveUserRequirement());
        });

        //default authorization policy
        options.FallbackPolicy = new AuthorizationPolicyBuilder().AddRequirements(new IsActiveUserRequirement()).Build();
      });

      services.AddTransient<IAuthorizationHandler, IsActiveUserRequirementHandler>();

      //checks for token and gets claims from token
      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
      {
        options.TokenValidationParameters = new TokenValidationParameters
        {
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Token:Key"])),
          ValidateAudience = false,
          ValidIssuer = _config["Token:Issuer"],
          ValidateIssuer = true,
          ValidateLifetime = true,
          ClockSkew = TimeSpan.Zero
        };
      });

      services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
      services.AddScoped<IUnitOfWork, UnitOfWork>();
      services.AddScoped(typeof(IGenericService<>), typeof(GenericService<>));
      services.AddScoped<ITokenService, TokenService>();
      services.AddScoped<IPasswordService, PasswordService>();

      services.AddSwaggerGen(options =>
      {
        options.SwaggerDoc("v1", new OpenApiInfo
        {
          Title = "Compfitition API",
          Version = "v1",
          Description = "Keep track of your goals and compete with friends!"
        });

        var securitySchema = new OpenApiSecurityScheme
        {
          Description = "JWT Auth Bearer Scheme",
          Name = "Authorization",
          In = ParameterLocation.Header,
          Type = SecuritySchemeType.Http,
          Scheme = "bearer",
          Reference = new OpenApiReference
          {
            Type = ReferenceType.SecurityScheme,
            Id = "Bearer"
          }
        };

        var securityRequirement = new OpenApiSecurityRequirement {
          {
            securitySchema,
            new [] {"Bearer"}
          }
        };

        options.AddSecurityRequirement(securityRequirement);
      });

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
    }

    //Middleware for request pipeline
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      app.UseMiddleware<ErrorHandlingMiddleware>();

      //middleware for missing endpoint - {0} is placeholder for status code
      app.UseStatusCodePagesWithReExecute("/errors/{0}");
      // app.UseHttpsRedirection();

      app.UseRouting();

      //app.UseStaticFiles();

      app.UseCors("CorsPolicy");

      app.UseAuthentication();

      app.UseAuthorization();

      app.UseSwagger();

      app.UseSwaggerUI(config =>
      {
        config.SwaggerEndpoint("/swagger/v1/swagger.json", "Compfitition API v1");
      });

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}

using API.Extensions;
using API.Helpers;
using API.Middleware;
using AutoMapper;
using Infrastructure.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

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
            .WithOrigins("http://localhost:3000", "http://localhost:5001");
        });
      });

      services.AddControllers();

      //Authorization policy means everything requires authorization unless allow anonymous
      //This became unnecessary when we added the IsActiveUser authorization policy,
      //however, I am leaving this in for future reference
      // services.AddControllers(options =>
      // {
      //   var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
      //   options.Filters.Add(new AuthorizeFilter(policy));
      // });

      services.AddAutoMapper(typeof(MappingProfiles));

      services.AddDbContext<DataContext>(x =>
      {
        x.UseSqlite(_config.GetConnectionString("DefaultConnection"));
      });

      services.AddAuthPolicies(_config);

      services.AddApplicationServices();

      services.AddSwaggerDocumentation();
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

      app.UseSwaggerDocumentation();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}

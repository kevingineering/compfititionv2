using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace API.Extensions
{
  public static class SwaggerServiceExtentions
  {
    public static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services)
    {
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

      return services;
    }

    public static IApplicationBuilder UseSwaggerDocumentation(this IApplicationBuilder app)
    {
      app.UseSwagger();

      app.UseSwaggerUI(config =>
      {
        config.SwaggerEndpoint("/swagger/v1/swagger.json", "Compfitition API v1");
      });

      return app;
    }
  }
}
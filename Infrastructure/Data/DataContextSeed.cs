using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
  public class DataContextSeed
  {
    public static async Task SeedAsync(DataContext context, ILoggerFactory loggerFactory)
    {
      try
      {
        if (!context.Users.Any())
        {
          var userData = File.ReadAllText("../Infrastructure/Data/SeedData/users.json");

          var users = JsonSerializer.Deserialize<List<User>>(userData);

          foreach (var user in users)
          {
            context.Users.Add(user);
          }

          await context.SaveChangesAsync();
        }

        if (!context.Goals.Any())
        {
          var goalData = File.ReadAllText("../Infrastructure/Data/SeedData/goals.json");

          var goals = JsonSerializer.Deserialize<List<Goal>>(goalData);

          foreach (var goal in goals)
          {
            context.Goals.Add(goal);
          }

          await context.SaveChangesAsync();
        }

        if (!context.UserFriendships.Any())
        {
          var friendData = File.ReadAllText("../Infrastructure/Data/SeedData/friendships.json");

          var friends = JsonSerializer.Deserialize<List<UserFriendship>>(friendData);

          foreach (var friend in friends)
          {
            context.UserFriendships.Add(friend);
          }

          await context.SaveChangesAsync();
        }

        if (!context.UserFriendRequests.Any())
        {
          var requestData = File.ReadAllText("../Infrastructure/Data/SeedData/requests.json");

          var requests = JsonSerializer.Deserialize<List<UserFriendRequest>>(requestData);

          foreach (var request in requests)
          {
            context.UserFriendRequests.Add(request);
          }

          await context.SaveChangesAsync();
        }
      }
      catch (Exception ex)
      {
        var logger = loggerFactory.CreateLogger<DataContextSeed>();
        logger.LogError(ex.Message);
      }
    }
  }
}
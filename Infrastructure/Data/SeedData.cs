using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
  public class SeedData
  {
    public static async Task SeedAsync(DataContext context, ILoggerFactory loggerFactory)
    {
      //hashed value of Pa$$w0rd
      var Password = "AGPZSkX9ngiJ31CtYvaPnxbIMqOkq8eEcbkOMXPvDAWGkQYXqJ05YKqLQE4hhTE+Xw==";

      var UserGuids = new Guid[8].Select(x => Guid.NewGuid()).ToArray();
      var CompGuids = new Guid[9].Select(x => Guid.NewGuid()).ToArray();

      try
      {
        if (!context.Users.Any())
        {
          var users = new List<User>
            {
                new User
                {
                    Id = UserGuids[0],
                    Name = "Alpha",
                    Email = "alpha@alpha.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddYears(-1),
                    IsSearchable = true
                },
                new User
                {
                    Id = UserGuids[1],
                    Name = "Bravo",
                    Email = "bravo@bravo.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddMonths(-11),
                    IsSearchable = false
                },
                new User
                {
                    Id = UserGuids[2],
                    Name = "Charlie",
                    Email = "charlie@charlie.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddMonths(-10),
                    IsSearchable = true
                },
                new User
                {
                    Id = UserGuids[3],
                    Name = "Delta",
                    Email = "delta@delta.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddMonths(-9),
                    IsSearchable = true
                },
                new User
                {
                    Id = UserGuids[4],
                    Name = "Echo",
                    Email = "echo@echo.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddYears(-1),
                    IsSearchable = true
                },
                new User
                {
                    Id = UserGuids[5],
                    Name = "Foxtrot",
                    Email = "foxtrot@foxtrot.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddYears(-1),
                    IsSearchable = true
                },
                new User
                {
                    Id = UserGuids[6],
                    Name = "Golf",
                    Email = "golf@golf.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddYears(-1),
                    IsSearchable = true
                },
                new User
                {
                    Id = UserGuids[7],
                    Name = "Hotel",
                    Email = "hotel@hotel.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddYears(-1),
                    IsSearchable = true
                },
            };

          foreach (var user in users)
          {
            context.Users.Add(user);
          }

          await context.SaveChangesAsync();
        }

        if (!context.UserGoals.Any())
        {
          var goals = new List<UserGoal>() {
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Current Alpha Cumulative Goal",
                UserId = UserGuids[0],
                Duration = 14,
                StartDate = DateTime.Now.AddDays(-7),
                Type = GoalType.cumulative,
                Description = "This is a current cumulative goal.",
                Units = "miles",
                Target = 100,
                IsPrivate = false,
                Ledger = "[1, 2, 3, 4, 5, 6, 7]",
                InitialValue = null
            },
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Current Alpha Difference Goal",
                UserId = UserGuids[0],
                Duration = 14,
                StartDate = DateTime.Now.AddDays(-7),
                Type = GoalType.difference,
                Description = "This is a current difference goal.",
                Units = "lbs",
                Target = 120,
                IsPrivate = true,
                Ledger = "[null, null, null, 138, null, null, null]",
                InitialValue = 140
            },
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Current Alpha Pass Fail Goal",
                UserId = UserGuids[0],
                Duration = 14,
                StartDate = DateTime.Now.AddDays(-7),
                Type = GoalType.passfail,
                Description = "This is a current pass fail goal.",
                Units = null,
                Target = 7,
                IsPrivate = false,
                Ledger = "[1,0,1,1,1,0,1]",
                InitialValue = null
            },
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Past Alpha Cumulative Goal",
                UserId = UserGuids[0],
                Duration = 14,
                StartDate = DateTime.Now.AddDays(-21),
                Type = GoalType.cumulative,
                Description = "This is a finished cumulative goal.",
                Units = "miles",
                Target = 100,
                IsPrivate = false,
                Ledger = "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]",
                InitialValue = null
            },
                new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Past Alpha Difference Goal",
                UserId = UserGuids[0],
                Duration = 14,
                StartDate = DateTime.Now.AddDays(-21),
                Type = GoalType.difference,
                Description = "This is a finished difference goal.",
                Units = "lbs",
                Target = 120,
                IsPrivate = true,
                Ledger= "[null, null, 134, null, null, null, 136, null, null, null, 124, null, null, 120]",
                InitialValue = 140
            },
                new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Past Alpha Pass Fail Goal",
                UserId = UserGuids[0],
                Duration = 14,
                StartDate = DateTime.Now.AddDays(-21),
                Type = GoalType.passfail,
                Description = "This is a finished pass fail goal.",
                Units = null,
                Target = 7,
                IsPrivate = false,
                Ledger = "[1,0,1,1,1,0,1,1,0,1,1,1,0,1]",
                InitialValue = null
            },
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Future Alpha Cumulative Goal",
                UserId = UserGuids[0],
                Duration = 14,
                StartDate = DateTime.Now.AddDays(7),
                Type = GoalType.cumulative,
                Description = "This is a future cumulative goal.",
                Units = "miles",
                Target = 100,
                IsPrivate = false,
                Ledger = null,
                InitialValue = null
            },
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Future Alpha Difference Goal",
                UserId = UserGuids[0],
                Duration = 14,
                StartDate = DateTime.Now.AddDays(7),
                Type = GoalType.difference,
                Description = "This is a future difference goal.",
                Units = "lbs",
                Target = 120,
                IsPrivate = true,
                Ledger = null,
                InitialValue = 140
            },
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Future Alpha Pass Fail Goal",
                UserId = UserGuids[0],
                Duration = 14,
                StartDate = DateTime.Now.AddDays(7),
                Type = GoalType.passfail,
                Description = "This is a future pass fail goal.",
                Units = null,
                Target = 7,
                IsPrivate = false,
                Ledger = null,
                InitialValue = null
            },
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Current Bravo Cumulative Goal",
                UserId = UserGuids[1],
                Duration = 14,
                StartDate = DateTime.Now.AddDays(-7),
                Type = GoalType.cumulative,
                Description = "This is a current cumulative goal.",
                Units = "miles",
                Target = 100,
                IsPrivate = false,
                Ledger= "[1, 2, 3, 4, 5, 6, 7]",
                InitialValue = null
            },
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Current Bravo Difference Goal",
                UserId = UserGuids[1],
                Duration = 14,
                StartDate = DateTime.Now.AddDays(-7),
                Type = GoalType.difference,
                Description = "This is a current difference goal.",
                Units = "lbs",
                Target = 120,
                IsPrivate = true,
                Ledger = "[null, null, null, 138, null, null, null]",
                InitialValue = 140
            },
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Current Bravo Pass Fail Goal",
                UserId = UserGuids[1],
                Duration = 14,
                StartDate = DateTime.Now.AddDays(-7),
                Type = GoalType.passfail,
                Description = "This is a current pass fail goal.",
                Units = null,
                Target = 7,
                IsPrivate = false,
                Ledger = "[1,0,1,1,1,0,1]",
                InitialValue = null
            },
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Past Bravo Cumulative Goal",
                UserId = UserGuids[1],
                Duration = 14,
                StartDate = DateTime.Now.AddDays(-21),
                Type = GoalType.cumulative,
                Description = "This is a finished cumulative goal.",
                Units = "miles",
                Target = 100,
                IsPrivate = false,
                Ledger = "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]",
                InitialValue = null
            },
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Past Bravo Difference Goal",
                UserId = UserGuids[1],
                Duration = 14,
                StartDate = DateTime.Now.AddDays(-21),
                Type = GoalType.difference,
                Description = "This is a finished difference goal.",
                Units = "lbs",
                Target = 120,
                IsPrivate = true,
                Ledger = "[null, null, 134, null, null, null, 136, null, null, null, 124, null, null, 120]",
                InitialValue = 140
            },
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Past Bravo Pass Fail Goal",
                UserId = UserGuids[1],
                Duration = 14,
                StartDate = DateTime.Now.AddDays(-21),
                Type = GoalType.passfail,
                Description = "This is a finished pass fail goal.",
                Units = null,
                Target = 7,
                IsPrivate = false,
                Ledger = "[1,0,1,1,1,0,1,1,0,1,1,1,0,1]",
                InitialValue = null
            },
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Future Bravo Cumulative Goal",
                UserId = UserGuids[1],
                Duration = 14,
                StartDate = DateTime.Now.AddDays(7),
                Type = GoalType.cumulative,
                Description = "This is a future cumulative goal.",
                Units = "miles",
                Target = 100,
                IsPrivate = false,
                Ledger = null,
                InitialValue = null
            },
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Future Bravo Difference Goal",
                UserId = UserGuids[1],
                Duration = 14,
                StartDate = DateTime.Now.AddDays(7),
                Type = GoalType.difference,
                Description = "This is a future difference goal.",
                Units = "lbs",
                Target = 120,
                IsPrivate = true,
                Ledger = null,
                InitialValue = 140
            },
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Future Bravo Pass Fail Goal",
                UserId = UserGuids[1],
                Duration = 14,
                StartDate = DateTime.Now.AddDays(7),
                Type = GoalType.passfail,
                Description = "This is a future pass fail goal.",
                Units = null,
                Target = 7,
                IsPrivate = false,
                Ledger = null,
                InitialValue = null
            },
        };

          foreach (var goal in goals)
          {
            context.UserGoals.Add(goal);
          }

          await context.SaveChangesAsync();
        }

        if (!context.UserFriendships.Any())
        {
          var friendships = new List<UserFriendship>
          {
            new UserFriendship {
                User1Id = UserGuids[0],
                User2Id = UserGuids[1],
            },
            new UserFriendship {
                User1Id = UserGuids[0],
                User2Id = UserGuids[2],
            },
            new UserFriendship {
                User1Id = UserGuids[2],
                User2Id = UserGuids[1],
            }
            };

          foreach (var friendship in friendships)
          {
            context.UserFriendships.Add(friendship);
          }

          await context.SaveChangesAsync();
        }

        if (!context.UserFriendRequests.Any())
        {

          var requests = new List<UserFriendRequest>
            {
                new UserFriendRequest {
                    SenderId = UserGuids[0],
                    ReceiverId = UserGuids[3]
                },
                new UserFriendRequest {
                    SenderId = UserGuids[4],
                    ReceiverId = UserGuids[0]
                },
                new UserFriendRequest {
                    SenderId = UserGuids[0],
                    ReceiverId = UserGuids[5]
                },
                new UserFriendRequest {
                    SenderId = UserGuids[6],
                    ReceiverId = UserGuids[0]
                }
            };

          foreach (var request in requests)
          {
            context.UserFriendRequests.Add(request);
          }

          await context.SaveChangesAsync();
        }

        if (!context.CompetitionGoals.Any())
        {
          var competitions = new List<CompetitionGoal> {
                new CompetitionGoal {
                    Id = CompGuids[0],
                    Name = "Current Pass Fail Competition",
                    Duration = 14,
                    StartDate = DateTime.Now.AddDays(-7),
                    Type = GoalType.passfail,
                    Description = "This is a current pass fail competition.",
                    Units = null,
                    Frequency = 6,
                    isHighestScoreWins = true,
                    IsPrivate = false
                },
                new CompetitionGoal {
                    Id = CompGuids[1],
                    Name = "Current Cumulative Competition",
                    Duration = 14,
                    StartDate = DateTime.Now.AddDays(-7),
                    Type = GoalType.cumulative,
                    Description = "This is a current cumulative competition.",
                    Units = "miles",
                    isHighestScoreWins = true,
                    IsPrivate = false
                },
                new CompetitionGoal {
                    Id = CompGuids[2],
                    Name = "Current Difference Competition",
                    Duration = 14,
                    StartDate = DateTime.Now.AddDays(-7),
                    Type = GoalType.difference,
                    Description = "This is a current difference competition.",
                    Units = "lbs",
                    isHighestScoreWins = false,
                    IsPrivate = true
                },
                new CompetitionGoal {
                    Id = CompGuids[3],
                    Name = "Past Pass Fail Competition",
                    Duration = 14,
                    StartDate = DateTime.Now.AddDays(-21),
                    Type = GoalType.passfail,
                    Description = "This is a past pass fail competition.",
                    Units = null,
                    Frequency = 6,
                    isHighestScoreWins = true,
                    IsPrivate = false
                },
                new CompetitionGoal {
                    Id = CompGuids[4],
                    Name = "Past Cumulative Competition",
                    Duration = 14,
                    StartDate = DateTime.Now.AddDays(-21),
                    Type = GoalType.cumulative,
                    Description = "This is a past cumulative competition.",
                    Units = "miles",
                    isHighestScoreWins = true,
                    IsPrivate = false
                },
                new CompetitionGoal {
                    Id = CompGuids[5],
                    Name = "Past Difference Competition",
                    Duration = 14,
                    StartDate = DateTime.Now.AddDays(-21),
                    Type = GoalType.difference,
                    Description = "This is a past difference competition.",
                    Units = "lbs",
                    isHighestScoreWins = false,
                    IsPrivate = true
                },
                new CompetitionGoal {
                    Id = CompGuids[6],
                    Name = "Future Pass Fail Competition",
                    Duration = 14,
                    StartDate = DateTime.Now.AddDays(7),
                    Type = GoalType.passfail,
                    Description = "This is a future pass fail competition.",
                    Units = null,
                    Frequency = 1,
                    isHighestScoreWins = true,
                    IsPrivate = false
                },
                new CompetitionGoal {
                    Id = CompGuids[7],
                    Name = "Future Cumulative Competition",
                    Duration = 14,
                    StartDate = DateTime.Now.AddDays(7),
                    Type = GoalType.cumulative,
                    Description = "This is a future cumulative competition.",
                    Units = "miles",
                    isHighestScoreWins = true,
                    IsPrivate = false
                },
                new CompetitionGoal {
                    Id = CompGuids[8],
                    Name = "Future Difference Competition",
                    Duration = 14,
                    StartDate = DateTime.Now.AddDays(7),
                    Type = GoalType.difference,
                    Description = "This is a future difference competition.",
                    Units = "lbs",
                    isHighestScoreWins = false,
                    IsPrivate = true
                },
            };

          foreach (var competition in competitions)
          {
            context.CompetitionGoals.Add(competition);
          }

          await context.SaveChangesAsync();
        }

        if (!context.CompetitionParticipants.Any())
        {
          var competitionParticipants = new List<CompetitionParticipant> {
            new CompetitionParticipant {
              CompId = CompGuids[0],
              UserId = UserGuids[0],
              Ledger = "[1,0,1,1,1,0,1]"
            },
            new CompetitionParticipant {
              CompId = CompGuids[0],
              UserId = UserGuids[1],
              Ledger = "[1,0,1,0,1,0,1]"
            },
            new CompetitionParticipant {
              CompId = CompGuids[0],
              UserId = UserGuids[2],
              Ledger = "[0,0,1,0,1,1,0]"
            },
            new CompetitionParticipant {
              CompId = CompGuids[1],
              UserId = UserGuids[0],
              Ledger = "[3, 4, 5, 6, 7, 8, 9]",
              Target = 120
            },
            new CompetitionParticipant {
              CompId = CompGuids[1],
              UserId = UserGuids[1],
              Ledger = "[2, 3, 4, 5, 6, 7, 8]",
              Target = 120
            },
            new CompetitionParticipant {
              CompId = CompGuids[1],
              UserId = UserGuids[2],
              Ledger = "[1, 2, 3, 4, 5, 6, 7]",
              Target = 120
            },
            new CompetitionParticipant {
              CompId = CompGuids[2],
              UserId = UserGuids[0],
              Ledger = "[null, null, null, 138, null, null, null]",
              InitialValue = 140,
              Target = 120
            },
            new CompetitionParticipant {
              CompId = CompGuids[2],
              UserId = UserGuids[1],
              Ledger = "[null, null, 158, null, null, null, null]",
              InitialValue = 150,
              Target = 135
            },
            new CompetitionParticipant {
              CompId = CompGuids[2],
              UserId = UserGuids[2],
              Ledger = "[null, null, null, null, null, 150, null]",
              InitialValue = 160,
              Target = 148
            },
            new CompetitionParticipant {
              CompId = CompGuids[3],
              UserId = UserGuids[0],
              Ledger = "[1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1]"
            },
            new CompetitionParticipant {
              CompId = CompGuids[3],
              UserId = UserGuids[1],
              Ledger = "[1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1]"
            },
            new CompetitionParticipant {
              CompId = CompGuids[3],
              UserId = UserGuids[2],
              Ledger = "[0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0]"
            },
            new CompetitionParticipant {
              CompId = CompGuids[4],
              UserId = UserGuids[0],
              Ledger = "[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]",
              Target = 120
            },
            new CompetitionParticipant {
              CompId = CompGuids[4],
              UserId = UserGuids[1],
              Ledger = "[2, 15, 3, 14, 4, 13, 5, 12, 6, 11, 7, 10, 8, 9]",
              Target = 120
            },
            new CompetitionParticipant {
              CompId = CompGuids[4],
              UserId = UserGuids[2],
              Ledger = "[8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7]",
              Target = 100
            },
            new CompetitionParticipant {
              CompId = CompGuids[5],
              UserId = UserGuids[0],
              Ledger = "[null, null, 134, null, null, null, 136, null, null, null, 124, null, null, 120]",
              InitialValue = 140,
              Target = 120
            },
            new CompetitionParticipant {
              CompId = CompGuids[5],
              UserId = UserGuids[1],
              Ledger = "[null, 152, null, null, null, null, 158, 156, null, 153, null, null, 149, null]",
              InitialValue = 150,
              Target = 130
            },
            new CompetitionParticipant {
              CompId = CompGuids[5],
              UserId = UserGuids[2],
              Ledger = "[158, 154, 156, 151, 148, 152, 149, 147, 147, 149, 145, 144, 142, 140]",
              InitialValue = 160,
              Target = 140
            },
            new CompetitionParticipant {
              CompId = CompGuids[6],
              UserId = UserGuids[0],
              Ledger = null
            },
            new CompetitionParticipant {
              CompId = CompGuids[6],
              UserId = UserGuids[1],
              Ledger = null
            },
            new CompetitionParticipant {
              CompId = CompGuids[6],
              UserId = UserGuids[2],
              Ledger = null
            },
            new CompetitionParticipant {
              CompId = CompGuids[7],
              UserId = UserGuids[0],
              Ledger = null,
              Target = 120
            },
            new CompetitionParticipant {
              CompId = CompGuids[7],
              UserId = UserGuids[1],
              Ledger = null,
              Target = 130
            },
            new CompetitionParticipant {
              CompId = CompGuids[7],
              UserId = UserGuids[2],
              Ledger = null,
              Target = 140
            },
            new CompetitionParticipant {
              CompId = CompGuids[8],
              UserId = UserGuids[0],
              Ledger = null,
              Target = 120
            },
            new CompetitionParticipant {
              CompId = CompGuids[8],
              UserId = UserGuids[1],
              Ledger = null,
              Target = 120
            },
            new CompetitionParticipant {
              CompId = CompGuids[8],
              UserId = UserGuids[2],
              Ledger = null,
              Target = 120
            },
          };

          foreach (var participant in competitionParticipants)
          {
            context.CompetitionParticipants.Add(participant);
          }

          await context.SaveChangesAsync();
        }

        if (!context.CompetitionAdmins.Any())
        {
          var competitionAdmins = new List<CompetitionAdmin> {
            new CompetitionAdmin {
              CompId = CompGuids[0],
              UserId = UserGuids[0]
            },
            new CompetitionAdmin {
              CompId = CompGuids[0],
              UserId = UserGuids[1]
            },
            new CompetitionAdmin {
              CompId = CompGuids[1],
              UserId = UserGuids[0]
            },
            new CompetitionAdmin {
              CompId = CompGuids[1],
              UserId = UserGuids[1]
            },
            new CompetitionAdmin {
              CompId = CompGuids[1],
              UserId = UserGuids[2]
            },
            new CompetitionAdmin {
              CompId = CompGuids[2],
              UserId = UserGuids[0]
            },
            new CompetitionAdmin {
              CompId = CompGuids[3],
              UserId = UserGuids[1]
            },
            new CompetitionAdmin {
              CompId = CompGuids[4],
              UserId = UserGuids[0]
            },
            new CompetitionAdmin {
              CompId = CompGuids[5],
              UserId = UserGuids[0]
            },
            new CompetitionAdmin {
              CompId = CompGuids[6],
              UserId = UserGuids[0]
            },
            new CompetitionAdmin {
              CompId = CompGuids[7],
              UserId = UserGuids[0]
            },
            new CompetitionAdmin {
              CompId = CompGuids[8],
              UserId = UserGuids[0]
            },
          };

          foreach (var admin in competitionAdmins)
          {
            context.CompetitionAdmins.Add(admin);
          }

          await context.SaveChangesAsync();
        }

        if (!context.CompetitionLetters.Any())
        {
          //   var letterData = File.ReadAllText("../Infrastructure/Data/SeedData/letters.json");

          //   var letters = JsonSerializer.Deserialize<List<CompetitionLetter>>(letterData);

          //   foreach (var letter in letters)
          //   {
          //     context.CompetitionLetters.Add(letter);
          //   }

          //   await context.SaveChangesAsync();
        }

        if (!context.CompetitionComments.Any())
        {
          //   var commentData = File.ReadAllText("../Infrastructure/Data/SeedData/comments.json");

          //   var comments = JsonSerializer.Deserialize<List<CompetitionComment>>(commentData);

          //   foreach (var comment in comments)
          //   {
          //     context.CompetitionComments.Add(comment);
          //   }

          //   await context.SaveChangesAsync();
        }
      }
      catch (Exception ex)
      {
        var logger = loggerFactory.CreateLogger<SeedData>();
        logger.LogError(ex.Message);
      }
    }
  }
}
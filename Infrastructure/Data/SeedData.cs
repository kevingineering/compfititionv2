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

      var UserGuids = new Guid[] {
        new Guid("4800e831-862d-43e0-a9b7-9b65e1a7aea7"),
        new Guid("d077735d-e272-47db-8c81-989dbf5f2a59"),
        new Guid("ff894206-b7d6-4d77-ae5f-a1febcf25be4"),
        new Guid("c1ed7e9b-023d-434e-85dc-f6ac61c306a0"),
        new Guid("193366a8-d2a2-4bf9-99ac-7b16b4982c84"),
        new Guid("cca3af46-c35c-438d-bf23-ede153b4f7df"),
        new Guid("8247bb00-2db8-4df6-92ac-614ae0b84a99"),
        new Guid("8be41773-eff0-4668-9326-b53976d852b2"),
        new Guid("df390947-82e4-466f-92a6-c60d62470fc6"),
        new Guid("75193a19-49a0-4467-8bc2-452af673b19d")
      };

      var CompGuids = new Guid[] {
        new Guid("bb9c3ed5-f59b-4b02-9582-d47beac0f210"),
        new Guid("db395ffc-c5d5-41fb-a3af-bcac4fdb8557"),
        new Guid("d4e57af1-e0f2-4f25-977e-ace3a49922f0"),
        new Guid("20318427-b97d-447f-8126-6386a2c9a7dd"),
        new Guid("f3c0243c-3059-4934-91ae-8d9f64a9f931"),
        new Guid("b5f514b8-5127-4960-9515-326367b4d385"),
        new Guid("eb5ad0eb-3e88-4aa6-87df-28da9e7a5907"),
        new Guid("859723ec-a1a1-41e1-b832-8e143fabaccb"),
        new Guid("1546bee1-35f7-4189-ac33-b7ab3c3c1967"),
        new Guid("066bc0ac-e3db-42fe-ad40-bb6cac2517e4"),
        new Guid("cf5cc588-eb24-4c20-9045-a4917205b225"),
        new Guid("f0c48861-d566-4153-9201-756af5026d48")
      };

      try
      {
        if (!context.Users.Any())
        {
          var users = new List<User>
            {
                new User
                {
                    Id = UserGuids[0],
                    Name = "Github",
                    Email = "guest@github.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddYears(-1),
                    IsSearchable = true
                },
                new User
                {
                    Id = UserGuids[1],
                    Name = "Alex",
                    Email = "alex@alex.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddMonths(-11),
                    IsSearchable = false
                },
                new User
                {
                    Id = UserGuids[2],
                    Name = "Brandon",
                    Email = "brandon@brandon.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddMonths(-10),
                    IsSearchable = true
                },
                new User
                {
                    Id = UserGuids[3],
                    Name = "Claire",
                    Email = "claire@claire.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddMonths(-9),
                    IsSearchable = true
                },
                new User
                {
                    Id = UserGuids[4],
                    Name = "Derek",
                    Email = "derek@derek.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddYears(-1),
                    IsSearchable = true
                },
                new User
                {
                    Id = UserGuids[5],
                    Name = "Emma",
                    Email = "emma@emma.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddYears(-1),
                    IsSearchable = true
                },
                new User
                {
                    Id = UserGuids[6],
                    Name = "Faye",
                    Email = "faye@faye.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddYears(-1),
                    IsSearchable = true
                },
                new User
                {
                    Id = UserGuids[7],
                    Name = "George",
                    Email = "george@george.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddYears(-1),
                    IsSearchable = true
                },
                new User
                {
                    Id = UserGuids[8],
                    Name = "Harold",
                    Email = "harold@harold.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddYears(-1),
                    IsSearchable = true
                },
                new User
                {
                    Id = UserGuids[9],
                    Name = "Isabella",
                    Email = "isabella@isabella.com",
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
                Name = "Current Cumulative Goal (Start Here)",
                UserId = UserGuids[0],
                Duration = 30,
                StartTime = DateTime.Now.AddDays(-14),
                Type = GoalType.cumulative,
                Description = "This is a goal. Goals are meant for individual users to keep track of their progress. Goals can be set as public or private if you'd rather other users not see.\n\nThis is a cumulative goal which means the target value is achieved by summing up the score from each day. With this goal you are trying to run 100 miles in a month, you'd better getting moving!",
                Units = "miles",
                Target = 100,
                IsPrivate = false,
                Ledger = "[3, 2, 3, 4, 0, 6, 2, 2, 2, 7, 0, 3, 3, 1]",
                InitialValue = null
            },
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Current Difference Goal",
                UserId = UserGuids[0],
                Duration = 28,
                StartTime = DateTime.Now.AddDays(-14),
                Type = GoalType.difference,
                Description = "This is a difference goal. Difference goals are used when you start with one value and wish to achieve a different value. Examples include losing weight loss or increasing the number of consecutive pullups you can do.",
                Units = "lbs",
                Target = 160,
                IsPrivate = true,
                Ledger = "[null, null, 168, null, 168, null, 169, 168, null, null, 166, null, 165, null ]",
                InitialValue = 170
            },
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Current Pass Fail Goal",
                UserId = UserGuids[0],
                Duration = 14,
                StartTime = DateTime.Now.AddDays(-13),
                Type = GoalType.passfail,
                Description = "This is a pass fail goal which can be used to track whether or not you did something on a particular day. \n\nIf you want to stretch every morning or lift weights three days a week, but aren't concerned with tracking values, this is the goal for you.",
                Units = null,
                Target = 7,
                IsPrivate = false,
                Ledger = "[1,1,1,1,0,1,1]",
                InitialValue = null
            },
            /*
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Past Cumulative Goal",
                UserId = UserGuids[0],
                Duration = 14,
                StartTime = DateTime.Now.AddDays(-21),
                Type = GoalType.cumulative,
                Description = "This is a finished goal. You can't change what has happened in the past, but you can always look back on it.",
                Units = "miles",
                Target = 100,
                IsPrivate = false,
                Ledger = "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]",
                InitialValue = null
            },
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Past Difference Goal",
                UserId = UserGuids[0],
                Duration = 14,
                StartTime = DateTime.Now.AddDays(-21),
                Type = GoalType.difference,
                Description = "This is a finished goal. You can't change what has happened in the past, but you can always look back on it.",
                Units = "pushups",
                Target = 60,
                IsPrivate = true,
                Ledger= "[null, 36, 37, null, null, 42, 40, 47, null, 54, 53, null, 58, 60]",
                InitialValue = 30
            },
            */
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Past Pass Fail Goal",
                UserId = UserGuids[0],
                Duration = 14,
                StartTime = DateTime.Now.AddDays(-21),
                Type = GoalType.passfail,
                Description = "This is a finished goal. You can't change what has happened in the past, but you can always look back on it.",
                Units = null,
                Target = 7,
                IsPrivate = false,
                Ledger = "[1,0,1,1,1,1,1,1,0,1,1,1,0,1]",
                InitialValue = null
            },
            /*
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Future Cumulative Goal",
                UserId = UserGuids[0],
                Duration = 60,
                StartTime = DateTime.Now.AddDays(7),
                Type = GoalType.cumulative,
                Description = "This is a future goal. You can't keep track of anything yet, but you can get ready to achieve your goals!",
                Units = "miles",
                Target = 100,
                IsPrivate = false,
                Ledger = null,
                InitialValue = null
            },
            */
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Future Difference Goal",
                UserId = UserGuids[0],
                Duration = 14,
                StartTime = DateTime.Now.AddDays(7),
                Type = GoalType.difference,
                Description = "This goal takes place in the future. You can't keep track of anything yet, but you can get ready to crush it!",
                Units = "pushups",
                Target = 60,
                IsPrivate = true,
                Ledger = null,
                InitialValue = 40
            },
            /*
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Future Pass Fail Goal",
                UserId = UserGuids[0],
                Duration = 14,
                StartTime = DateTime.Now.AddDays(7),
                Type = GoalType.passfail,
                Description = "This is a future pass fail goal.",
                Units = null,
                Target = 7,
                IsPrivate = false,
                Ledger = null,
                InitialValue = null
            },
            */
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Public Friend Goal",
                UserId = UserGuids[1],
                Duration = 14,
                StartTime = DateTime.Now.AddDays(-7),
                Type = GoalType.cumulative,
                Description = "This is your friend's public goal. He has another goal, but it is set to private, so you can't see it.",
                Units = "miles",
                Target = 100,
                IsPrivate = false,
                Ledger= "[1, 2, 3, 4, 5, 6, 7]",
                InitialValue = null
            },
            new UserGoal {
                Id = Guid.NewGuid(),
                Name = "Private Friend Goal",
                UserId = UserGuids[1],
                Duration = 14,
                StartTime = DateTime.Now.AddDays(-7),
                Type = GoalType.difference,
                Description = "This is a current difference goal.",
                Units = "lbs",
                Target = 120,
                IsPrivate = true,
                Ledger = "[null, null, null, 138, null, null, null]",
                InitialValue = 140
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
                User1Id = UserGuids[0],
                User2Id = UserGuids[3],
            },
            new UserFriendship {
                User1Id = UserGuids[0],
                User2Id = UserGuids[4],
            },
            new UserFriendship {
                User1Id = UserGuids[1],
                User2Id = UserGuids[2],
            },
            new UserFriendship {
                User1Id = UserGuids[1],
                User2Id = UserGuids[5],
            },
            new UserFriendship {
                User1Id = UserGuids[1],
                User2Id = UserGuids[6],
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
                  ReceiverId = UserGuids[5]
              },
              new UserFriendRequest {
                  SenderId = UserGuids[6],
                  ReceiverId = UserGuids[0]
              },
              new UserFriendRequest {
                  SenderId = UserGuids[7],
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
                  Name = "Current Cumulative Competition",
                  Duration = 14,
                  StartTime = DateTime.Now.AddDays(-7),
                  Type = GoalType.cumulative,
                  Description = "This is a competition. Competitions allow users to compete with each other while trying to achieve a shared goal. Individual users may have their own private goals within a competition, click 'Modify My Goal' below to see more.",
                  Units = "miles",
                  isHighestScoreWins = true,
                  IsPrivate = false
              },
              new CompetitionGoal {
                  Id = CompGuids[1],
                  Name = "Current Pass Fail Competition",
                  Duration = 28,
                  StartTime = DateTime.Now.AddDays(-7),
                  Type = GoalType.passfail,
                  Description = "This is a pass fail competition. You are an admin in this competition, click the 'View as Admin' button to see what you can do.",
                  Units = null,
                  Frequency = 6,
                  isHighestScoreWins = true,
                  IsPrivate = false
              },
              new CompetitionGoal {
                  Id = CompGuids[2],
                  Name = "Current Difference Competition",
                  Duration = 14,
                  StartTime = DateTime.Now.AddDays(-7),
                  Type = GoalType.difference,
                  Description = "Here participants are trying to lose the most weight. Notice the leaderboard, in this competition the lowest score wins.",
                  Units = "lbs",
                  isHighestScoreWins = false,
                  IsPrivate = true
              },
              /*
              new CompetitionGoal {
                  Id = CompGuids[3],
                  Name = "Past Pass Fail Competition",
                  Duration = 14,
                  StartTime = DateTime.Now.AddDays(-21),
                  Type = GoalType.passfail,
                  Description = "This is a finished competition. As with goals, you cannot change the outcome once a competition has finished.",
                  Units = null,
                  Frequency = 6,
                  isHighestScoreWins = true,
                  IsPrivate = false
              },
              new CompetitionGoal {
                  Id = CompGuids[4],
                  Name = "Past Cumulative Competition",
                  Duration = 14,
                  StartTime = DateTime.Now.AddDays(-21),
                  Type = GoalType.cumulative,
                  Description = "This is a past cumulative competition.",
                  Units = "miles",
                  isHighestScoreWins = true,
                  IsPrivate = false
              },
              */
              new CompetitionGoal {
                  Id = CompGuids[5],
                  Name = "Past Difference Competition",
                  Duration = 14,
                  StartTime = DateTime.Now.AddDays(-21),
                  Type = GoalType.difference,
                  Description = "This is a finished competition. As with goals, you cannot change the outcome once a competition has finished.",
                  Units = "lbs",
                  isHighestScoreWins = false,
                  IsPrivate = true
              },
              /*
              new CompetitionGoal {
                  Id = CompGuids[6],
                  Name = "Future Pass Fail Competition",
                  Duration = 14,
                  StartTime = DateTime.Now.AddDays(7),
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
                  StartTime = DateTime.Now.AddDays(7),
                  Type = GoalType.cumulative,
                  Description = "This is a future cumulative competition.",
                  Units = "miles",
                  isHighestScoreWins = true,
                  IsPrivate = false
              },
              */
              new CompetitionGoal {
                  Id = CompGuids[8],
                  Name = "Future Difference Competition",
                  Duration = 14,
                  StartTime = DateTime.Now.AddDays(7),
                  Type = GoalType.difference,
                  Description = "This competition hasn't started yet. As an admin, you can invite your friends to join and modify anything about the competition before it begins.",
                  Units = "lbs",
                  isHighestScoreWins = false,
                  IsPrivate = true
              },
              new CompetitionGoal {
                  Id = CompGuids[9],
                  Name = "Current Cumulative Competition",
                  Duration = 21,
                  StartTime = DateTime.Now.AddDays(-14),
                  Type = GoalType.cumulative,
                  Description = "This competition has already begun, and you are not participating. You can't join a competition that has started, but you can comment to cheer on your friends.",
                  Units = "miles",
                  isHighestScoreWins = true,
                  IsPrivate = false
              },
              new CompetitionGoal {
                  Id = CompGuids[10],
                  Name = "Future Pass/Fail Competition",
                  Duration = 14,
                  StartTime = DateTime.Now.AddDays(7),
                  Type = GoalType.passfail,
                  Description = "You are not currently in this competition. If you'd like to participate, request to join!",
                  Frequency = 5,
                  Units = null,
                  isHighestScoreWins = true,
                  IsPrivate = false
              },
              new CompetitionGoal {
                  Id = CompGuids[11],
                  Name = "Future Cumulative Competition",
                  Duration = 14,
                  StartTime = DateTime.Now.AddDays(7),
                  Type = GoalType.cumulative,
                  Description = "Run more than all of your friends in two weeks!",
                  Units = "miles",
                  isHighestScoreWins = true,
                  IsPrivate = false
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
            //0
            new CompetitionParticipant {
              CompId = CompGuids[0],
              UserId = UserGuids[0],
              Ledger = "[3, 4, 2, 6, 6, 8, 3]",
              Target = 120
            },
            new CompetitionParticipant {
              CompId = CompGuids[0],
              UserId = UserGuids[1],
              Ledger = "[7, 3, 2, 2, 6, 4, 5]",
              Target = 120
            },
            new CompetitionParticipant {
              CompId = CompGuids[0],
              UserId = UserGuids[2],
              Ledger = "[1, 2, 6, 2, 4, 3, 6]",
              Target = 120
            },
            //1
            new CompetitionParticipant {
              CompId = CompGuids[1],
              UserId = UserGuids[0],
              Ledger = "[1,0,1,1,1,1,1]"
            },
            new CompetitionParticipant {
              CompId = CompGuids[1],
              UserId = UserGuids[1],
              Ledger = "[1,0,1,0,1,0,1]"
            },
            new CompetitionParticipant {
              CompId = CompGuids[1],
              UserId = UserGuids[3],
              Ledger = "[0,0,1,0,1,1,0]"
            },
            //2
            new CompetitionParticipant {
              CompId = CompGuids[2],
              UserId = UserGuids[0],
              Ledger = "[null, null, null, 197, 198, null, 195]",
              InitialValue = 200,
              Target = 185
            },
            new CompetitionParticipant {
              CompId = CompGuids[2],
              UserId = UserGuids[1],
              Ledger = "[null, null, 151, null, null, 150, null]",
              InitialValue = 150,
              Target = 135
            },
            new CompetitionParticipant {
              CompId = CompGuids[2],
              UserId = UserGuids[2],
              Ledger = "[null, 155, null, null, null, 150, null]",
              InitialValue = 160,
              Target = 148
            },
            /*
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
              UserId = UserGuids[4],
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
            */
            //5
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
              UserId = UserGuids[4],
              Ledger = "[158, 154, 156, 151, 148, 152, 149, 147, 147, 149, 145, 144, 142, 140]",
              InitialValue = 160,
              Target = 140
            },
            /*
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
            */
            //8
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
            //9
            new CompetitionParticipant {
              CompId = CompGuids[9],
              UserId = UserGuids[1],
              Ledger = "[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]",
              Target = 120
            },
            new CompetitionParticipant {
              CompId = CompGuids[9],
              UserId = UserGuids[5],
              Ledger = "[2, 15, 3, 14, 4, 13, 5, 12, 6, 11, 7, 10, 8, 9]",
              Target = 120
            },
            new CompetitionParticipant {
              CompId = CompGuids[9],
              UserId = UserGuids[6],
              Ledger = "[8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7]",
              Target = 100
            },
            //10
            new CompetitionParticipant {
              CompId = CompGuids[10],
              UserId = UserGuids[1],
              Ledger = null
            },
            new CompetitionParticipant {
              CompId = CompGuids[10],
              UserId = UserGuids[2],
              Ledger = null
            },
            new CompetitionParticipant {
              CompId = CompGuids[10],
              UserId = UserGuids[5],
              Ledger = null
            },
            //11
            new CompetitionParticipant {
              CompId = CompGuids[11],
              UserId = UserGuids[2],
              Ledger = null,
              Target = 120
            },
            new CompetitionParticipant {
              CompId = CompGuids[11],
              UserId = UserGuids[5],
              Ledger = null,
              Target = 130
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
              UserId = UserGuids[1]
            },
            new CompetitionAdmin {
              CompId = CompGuids[0],
              UserId = UserGuids[2]
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
              CompId = CompGuids[5],
              UserId = UserGuids[2]
            },
            new CompetitionAdmin {
              CompId = CompGuids[8],
              UserId = UserGuids[0]
            },
            new CompetitionAdmin {
              CompId = CompGuids[8],
              UserId = UserGuids[1]
            },
            new CompetitionAdmin {
              CompId = CompGuids[9],
              UserId = UserGuids[1]
            },
            new CompetitionAdmin {
              CompId = CompGuids[10],
              UserId = UserGuids[5]
            },
            new CompetitionAdmin {
              CompId = CompGuids[11],
              UserId = UserGuids[1]
            },
          };

          foreach (var admin in competitionAdmins)
          {
            context.CompetitionAdmins.Add(admin);
          }

          await context.SaveChangesAsync();
        }

        if (!context.CompetitionInvites.Any())
        {
          var competitionInvites = new List<CompetitionInvite> {
            new CompetitionInvite {
              CompId = CompGuids[8],
              InviteeId = UserGuids[6]
            },
            new CompetitionInvite {
              CompId = CompGuids[11],
              InviteeId = UserGuids[0]
            },
          };

          foreach (var invite in competitionInvites)
          {
            context.CompetitionInvites.Add(invite);
          }

          await context.SaveChangesAsync();
        }

        if (!context.CompetitionParticipantRequests.Any())
        {
          var participantRequests = new List<CompetitionParticipantRequest> {
            new CompetitionParticipantRequest {
              CompId = CompGuids[8],
              RequesterId = UserGuids[5]
            }
          };

          foreach (var request in participantRequests)
          {
            context.CompetitionParticipantRequests.Add(request);
          }

          await context.SaveChangesAsync();
        }

        if (!context.CompetitionAdminRequests.Any())
        {
          var adminRequests = new List<CompetitionAdminRequest> {
            new CompetitionAdminRequest {
              CompId = CompGuids[8],
              ParticipantId = UserGuids[5]
            }
          };

          foreach (var request in adminRequests)
          {
            context.CompetitionAdminRequests.Add(request);
          }

          await context.SaveChangesAsync();
        }

        if (!context.UserNotifications.Any())
        {
          //   var commentData = File.ReadAllText("../Infrastructure/Data/SeedData/comments.json");

          //   var comments = JsonSerializer.Deserialize<List<CompetitionComment>>(commentData);

          //   foreach (var comment in comments)
          //   {
          //     context.CompetitionComments.Add(comment);
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
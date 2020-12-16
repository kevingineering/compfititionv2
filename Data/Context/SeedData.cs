using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entity;
using Microsoft.Extensions.Logging;

namespace Data.Context
{
  public class SeedData
  {
    //TODO - break into smaller method? 
    public static async Task SeedAsync(DataContext context, ILoggerFactory loggerFactory)
    {
      //hashed value of Pa$$w0rd
      var Password = "AGPZSkX9ngiJ31CtYvaPnxbIMqOkq8eEcbkOMXPvDAWGkQYXqJ05YKqLQE4hhTE+Xw==";

      var UserGuids = new Guid[10] {
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

      var CompGuids = new Guid[9] {
        new Guid("bb9c3ed5-f59b-4b02-9582-d47beac0f210"),
        new Guid("db395ffc-c5d5-41fb-a3af-bcac4fdb8557"),
        new Guid("d4e57af1-e0f2-4f25-977e-ace3a49922f0"),
        new Guid("20318427-b97d-447f-8126-6386a2c9a7dd"),
        new Guid("f3c0243c-3059-4934-91ae-8d9f64a9f931"),

        new Guid("b5f514b8-5127-4960-9515-326367b4d385"),
        new Guid("eb5ad0eb-3e88-4aa6-87df-28da9e7a5907"),
        new Guid("859723ec-a1a1-41e1-b832-8e143fabaccb"),
        new Guid("1546bee1-35f7-4189-ac33-b7ab3c3c1967")
      };

      var ChallengeGuids = new Guid[15] {
        new Guid ("7d5fb614-27cd-4d58-803e-fb775042b77d"),
        new Guid ("d27bdf69-8f02-4503-83da-99a84fd3c3a0"),
        new Guid ("cea319aa-8d83-4e3e-881f-b12a57de5f14"),
        new Guid ("2e28f9b1-223a-41c9-b47e-a28e9e06f347"),
        new Guid ("860043c3-e897-49f7-96c6-f2e4a7283875"),

        new Guid ("c8c367b9-3b04-412a-9a75-0ea0567768db"),
        new Guid ("074c9146-2d9b-47e0-9c46-274e0b5adb10"),
        new Guid ("b0a3a87f-94b5-4391-b5af-8d9e8ee1380e"),
        new Guid ("81126f3c-9845-4d73-ab71-57e3742bc94b"),
        new Guid ("0a4048df-43d1-4c3a-ad49-a7f4b9802c5f"),

        new Guid ("d3eacc9d-efa1-4f40-8ff8-dcfb867ac96f"),
        new Guid ("5c974482-b17c-42af-8cd8-92d728af3995"),
        new Guid ("450395c7-e56c-430c-a291-2030cd059cd5"),
        new Guid ("fe8b825a-2cba-4651-9c66-0464ab387ab1"),
        new Guid ("d30c0f18-056d-4017-91ed-7a5ebb396fdf")
      };

      try
      {
        if (!context.Users.Any())
        {
          var users = new List<User>
            {
                new User
                {
                    UserId = UserGuids[0],
                    Name = "Github",
                    Email = "guest@github.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddYears(-1),
                    IsSearchable = true
                },
                new User
                {
                    UserId = UserGuids[1],
                    Name = "Alex",
                    Email = "alex@alex.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddMonths(-11),
                    IsSearchable = false
                },
                new User
                {
                    UserId = UserGuids[2],
                    Name = "Brandon",
                    Email = "brandon@brandon.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddMonths(-10),
                    IsSearchable = true
                },
                new User
                {
                    UserId = UserGuids[3],
                    Name = "Claire",
                    Email = "claire@claire.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddMonths(-9),
                    IsSearchable = true
                },
                new User
                {
                    UserId = UserGuids[4],
                    Name = "Derek",
                    Email = "derek@derek.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddYears(-1),
                    IsSearchable = true
                },
                new User
                {
                    UserId = UserGuids[5],
                    Name = "Emma",
                    Email = "emma@emma.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddYears(-1),
                    IsSearchable = true
                },
                new User
                {
                    UserId = UserGuids[6],
                    Name = "Faye",
                    Email = "faye@faye.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddYears(-1),
                    IsSearchable = true
                },
                new User
                {
                    UserId = UserGuids[7],
                    Name = "George",
                    Email = "george@george.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddYears(-1),
                    IsSearchable = true
                },
                new User
                {
                    UserId = UserGuids[8],
                    Name = "Harold",
                    Email = "harold@harold.com",
                    Password = Password,
                    RegisterDate = DateTime.Now.AddYears(-1),
                    IsSearchable = true
                },
                new User
                {
                    UserId = UserGuids[9],
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

        if (!context.Challenges.Any())
        {
          var challenges = new List<Challenge>() {
            new Challenge {
                ChallengeId = ChallengeGuids[0],
                Name = "Current Cumulative Goal (Start Here)",
                Duration = 30,
                StartTime = DateTime.Now.AddDays(-14),
                Category = CategoryEnum.cumulative,
                Description = "This is a goal. Goals are meant for individual users to keep track of their progress. Goals can be set as public or private if you'd rather other users not see.\n\nThis is a cumulative goal which means the target value is achieved by summing up the score from each day. With this goal you are trying to run 100 miles in a month, you'd better getting moving!",
                Units = "miles",
                DaysPerWeek = null
            },
            new Challenge {
                ChallengeId = ChallengeGuids[1],
                Name = "Current Difference Goal",
                Duration = 28,
                StartTime = DateTime.Now.AddDays(-14),
                Category = CategoryEnum.difference,
                Description = "This is a difference goal. Difference goals are used when you start with one value and wish to achieve a different value. Examples include losing weight loss or increasing the number of consecutive pullups you can do.",
                Units = "lbs",
                DaysPerWeek = null
            },
            new Challenge {
                ChallengeId = ChallengeGuids[2],
                Name = "Current Pass Fail Goal",
                Duration = 14,
                StartTime = DateTime.Now.AddDays(-13),
                Category = CategoryEnum.passfail,
                Description = "This is a pass fail goal which can be used to track whether or not you did something on a particular day. \n\nIf you want to stretch every morning or lift weights three days a week, but aren't concerned with tracking values, this is the goal for you.",
                Units = null,
                DaysPerWeek = 7,
            },
            new Challenge {
                ChallengeId = ChallengeGuids[3],
                Name = "Past Pass Fail Goal",
                Duration = 14,
                StartTime = DateTime.Now.AddDays(-21),
                Category = CategoryEnum.passfail,
                Description = "This is a finished goal. You can't change what has happened in the past, but you can always look back on it.",
                Units = null,
                DaysPerWeek = 7
            },
            new Challenge {
                ChallengeId = ChallengeGuids[4],
                Name = "Future Difference Goal",
                Duration = 14,
                StartTime = DateTime.Now.AddDays(7),
                Category = CategoryEnum.difference,
                Description = "This goal takes place in the future. You can't keep track of anything yet, but you can get ready to crush it!",
                Units = "pushups",
                DaysPerWeek = null
            },
            new Challenge {
                ChallengeId = ChallengeGuids[5],
                Name = "Public Friend Goal",
                Duration = 14,
                StartTime = DateTime.Now.AddDays(-7),
                Category = CategoryEnum.cumulative,
                Description = "This is your friend's public goal. He has another goal, but it is set to private, so you can't see it.",
                Units = "miles",
                DaysPerWeek = null
            },
            new Challenge {
                ChallengeId = ChallengeGuids[6],
                Name = "Private Friend Goal",
                Duration = 14,
                StartTime = DateTime.Now.AddDays(-7),
                Category = CategoryEnum.difference,
                Description = "This is a current difference goal.",
                Units = "lbs",
                DaysPerWeek = null
            },
            new Challenge {
                ChallengeId = ChallengeGuids[7],
                Name = "Current Cumulative Competition",
                Duration = 14,
                StartTime = DateTime.Now.AddDays(-7),
                Category = CategoryEnum.cumulative,
                Description = "This is a competition. Competitions allow users to compete with each other while trying to achieve a shared goal. Individual users may have their own private goals within a competition, click 'Modify My Goal' below to see more.",
                Units = "miles",
                DaysPerWeek = null
            },
            new Challenge {
                ChallengeId = ChallengeGuids[8],
                Name = "Current Pass Fail Competition",
                Duration = 28,
                StartTime = DateTime.Now.AddDays(-7),
                Category = CategoryEnum.passfail,
                Description = "This is a pass fail competition. You are an admin in this competition, click the 'View as Admin' button to see what you can do.",
                Units = null,
                DaysPerWeek = 6,
            },
            new Challenge {
                ChallengeId = ChallengeGuids[9],
                Name = "Current Difference Competition",
                Duration = 14,
                StartTime = DateTime.Now.AddDays(-7),
                Category = CategoryEnum.difference,
                Description = "Here participants are trying to lose the most weight. Notice the leaderboard, in this competition the lowest score wins.",
                Units = "lbs",
                DaysPerWeek = null
            },
            new Challenge {
                ChallengeId = ChallengeGuids[10],
                Name = "Past Difference Competition",
                Duration = 14,
                StartTime = DateTime.Now.AddDays(-21),
                Category = CategoryEnum.difference,
                Description = "This is a finished competition. As with goals, you cannot change the outcome once a competition has finished.",
                Units = "lbs",
                DaysPerWeek = null
            },
            new Challenge {
                ChallengeId = ChallengeGuids[11],
                Name = "Future Difference Competition",
                Duration = 14,
                StartTime = DateTime.Now.AddDays(7),
                Category = CategoryEnum.difference,
                Description = "This competition hasn't started yet. As an admin, you can invite your friends to join and modify anything about the competition before it begins.",
                Units = "lbs",
                DaysPerWeek = null
            },
            new Challenge {
                ChallengeId = ChallengeGuids[12],
                Name = "Current Cumulative Competition",
                Duration = 21,
                StartTime = DateTime.Now.AddDays(-14),
                Category = CategoryEnum.cumulative,
                Description = "This competition has already begun, and you are not participating. You can't join a competition that has started, but you can comment to cheer on your friends.",
                Units = "miles",
                DaysPerWeek = null
            },
            new Challenge {
                ChallengeId = ChallengeGuids[13],
                Name = "Future Pass/Fail Competition",
                Duration = 14,
                StartTime = DateTime.Now.AddDays(7),
                Category = CategoryEnum.passfail,
                Description = "You are not currently in this competition. If you'd like to participate, request to join!",
                Units = null,
                DaysPerWeek = 5,
            },
            new Challenge {
                ChallengeId = ChallengeGuids[14],
                Name = "Future Cumulative Competition",
                Duration = 14,
                StartTime = DateTime.Now.AddDays(7),
                Category = CategoryEnum.cumulative,
                Description = "Run more than all of your friends in two weeks!",
                Units = "miles",
                DaysPerWeek = 5,
            },
          };

          foreach (var challenge in challenges)
          {
            context.Challenges.Add(challenge);
          }

          await context.SaveChangesAsync();
        };

        if (!context.Goals.Any())
        {
          var goals = new List<Goal>() {
            new Goal {
                GoalId = new Guid(),
                UserId = UserGuids[0],
                ChallengeId = ChallengeGuids[0],
                InitialValue = null,
                Target = 100,
                IsPrivate = false,
                Ledger = "[3, 2, 3, 4, 0, 6, 2, 2, 2, 7, 0, 3, 3, 1]",
            },
            new Goal {
                GoalId = new Guid(),
                UserId = UserGuids[0],
                ChallengeId = ChallengeGuids[1],
                InitialValue = 170,
                Target = 160,
                IsPrivate = true,
                Ledger = "[null, null, 168, null, 168, null, 169, 168, null, null, 166, null, 165, null ]",
            },
            new Goal {
                GoalId = new Guid(),
                UserId = UserGuids[0],
                ChallengeId = ChallengeGuids[2],
                InitialValue = null,
                Target = null,
                IsPrivate = false,
                Ledger = "[1,1,1,1,0,1,1]",
            },
            new Goal {
                GoalId = new Guid(),
                UserId = UserGuids[0],
                ChallengeId = ChallengeGuids[3],
                InitialValue = null,
                Target = null,
                IsPrivate = false,
                Ledger = "[1,0,1,1,1,1,1,1,0,1,1,1,0,1]",
            },
            new Goal {
                GoalId = new Guid(),
                UserId = UserGuids[0],
                ChallengeId = ChallengeGuids[4],
                InitialValue = 40,
                Target = 60,
                IsPrivate = true,
                Ledger = null,
            },
            new Goal {
                GoalId = new Guid(),
                UserId = UserGuids[1],
                ChallengeId = ChallengeGuids[5],
                InitialValue = null,
                Target = 100,
                IsPrivate = false,
                Ledger= "[1, 2, 3, 4, 5, 6, 7]",
            },
            new Goal {
                GoalId = new Guid(),
                UserId = UserGuids[1],
                ChallengeId = ChallengeGuids[6],
                InitialValue = 140,
                Target = 120,
                IsPrivate = true,
                Ledger = "[null, null, null, 138, null, null, null]",
            },
        };

          foreach (var goal in goals)
          {
            context.Goals.Add(goal);
          }

          await context.SaveChangesAsync();
        }

        if (!context.Friendships.Any())
        {
          var friendships = new List<Friendship>
          {
            new Friendship {
                User1Id = UserGuids[0],
                User2Id = UserGuids[1],
            },
            new Friendship {
                User1Id = UserGuids[0],
                User2Id = UserGuids[2],
            },
            new Friendship {
                User1Id = UserGuids[0],
                User2Id = UserGuids[3],
            },
            new Friendship {
                User1Id = UserGuids[0],
                User2Id = UserGuids[4],
            },
            new Friendship {
                User1Id = UserGuids[1],
                User2Id = UserGuids[2],
            },
            new Friendship {
                User1Id = UserGuids[1],
                User2Id = UserGuids[5],
            },
            new Friendship {
                User1Id = UserGuids[1],
                User2Id = UserGuids[6],
            }
          };

          foreach (var friendship in friendships)
          {
            context.Friendships.Add(friendship);
          }

          await context.SaveChangesAsync();
        }

        if (!context.FriendRequests.Any())
        {
          var friendRequests = new List<FriendRequest>
            {
              new FriendRequest {
                  SenderId = UserGuids[0],
                  ReceiverId = UserGuids[5]
              },
              new FriendRequest {
                  SenderId = UserGuids[6],
                  ReceiverId = UserGuids[0]
              },
              new FriendRequest {
                  SenderId = UserGuids[7],
                  ReceiverId = UserGuids[0]
              }
            };

          foreach (var friendRequest in friendRequests)
          {
            context.FriendRequests.Add(friendRequest);
          }

          await context.SaveChangesAsync();
        }

        if (!context.Competitions.Any())
        {
          var competitions = new List<Competition> {
              new Competition {
                  CompetitionId = CompGuids[0],
                  ChallengeId = ChallengeGuids[7],
                  IsHighestScoreWins = true,
                  IsPrivate = false
              },
              new Competition {
                  CompetitionId = CompGuids[1],
                  ChallengeId = ChallengeGuids[8],
                  IsHighestScoreWins = true,
                  IsPrivate = false
              },
              new Competition {
                  CompetitionId = CompGuids[2],
                  ChallengeId = ChallengeGuids[9],
                  IsHighestScoreWins = false,
                  IsPrivate = true
              },
              new Competition {
                  CompetitionId = CompGuids[3],
                  ChallengeId = ChallengeGuids[10],
                  IsHighestScoreWins = false,
                  IsPrivate = false
              },
              new Competition {
                  CompetitionId = CompGuids[4],
                  ChallengeId = ChallengeGuids[11],
                  IsHighestScoreWins = false,
                  IsPrivate = false
              },
              new Competition {
                  CompetitionId = CompGuids[5],
                  ChallengeId = ChallengeGuids[12],
                  IsHighestScoreWins = true,
                  IsPrivate = false
              },
              new Competition {
                  CompetitionId = CompGuids[6],
                  ChallengeId = ChallengeGuids[13],
                  IsHighestScoreWins = true,
                  IsPrivate = false
              },
              new Competition {
                  CompetitionId = CompGuids[7],
                  ChallengeId = ChallengeGuids[14],
                  IsHighestScoreWins = true,
                  IsPrivate = false
              },
            };

          foreach (var competition in competitions)
          {
            context.Competitions.Add(competition);
          }

          await context.SaveChangesAsync();
        }

        if (!context.Participants.Any())
        {
          var participants = new List<Participant> {
            new Participant {
              CompetitionId = CompGuids[0],
              UserId = UserGuids[0],
              Ledger = "[3, 4, 2, 6, 6, 8, 3]",
              Target = 120
            },
            new Participant {
              CompetitionId = CompGuids[0],
              UserId = UserGuids[1],
              Ledger = "[7, 3, 2, 2, 6, 4, 5]",
              Target = 120
            },
            new Participant {
              CompetitionId = CompGuids[0],
              UserId = UserGuids[2],
              Ledger = "[1, 2, 6, 2, 4, 3, 6]",
              Target = 120
            },
            new Participant {
              CompetitionId = CompGuids[1],
              UserId = UserGuids[0],
              Ledger = "[1,0,1,1,1,1,1]"
            },
            new Participant {
              CompetitionId = CompGuids[1],
              UserId = UserGuids[1],
              Ledger = "[1,0,1,0,1,0,1]"
            },
            new Participant {
              CompetitionId = CompGuids[1],
              UserId = UserGuids[3],
              Ledger = "[0,0,1,0,1,1,0]"
            },
            new Participant {
              CompetitionId = CompGuids[2],
              UserId = UserGuids[0],
              Ledger = "[null, null, null, 197, 198, null, 195]",
              InitialValue = 200,
              Target = 185
            },
            new Participant {
              CompetitionId = CompGuids[2],
              UserId = UserGuids[1],
              Ledger = "[null, null, 151, null, null, 150, null]",
              InitialValue = 150,
              Target = 135
            },
            new Participant {
              CompetitionId = CompGuids[2],
              UserId = UserGuids[2],
              Ledger = "[null, 155, null, null, null, 150, null]",
              InitialValue = 160,
              Target = 148
            },
            new Participant {
              CompetitionId = CompGuids[3],
              UserId = UserGuids[0],
              Ledger = "[null, null, 134, null, null, null, 136, null, null, null, 124, null, null, 120]",
              InitialValue = 140,
              Target = 120
            },
            new Participant {
              CompetitionId = CompGuids[3],
              UserId = UserGuids[1],
              Ledger = "[null, 152, null, null, null, null, 158, 156, null, 153, null, null, 149, null]",
              InitialValue = 150,
              Target = 130
            },
            new Participant {
              CompetitionId = CompGuids[3],
              UserId = UserGuids[4],
              Ledger = "[158, 154, 156, 151, 148, 152, 149, 147, 147, 149, 145, 144, 142, 140]",
              InitialValue = 160,
              Target = 140
            },
            new Participant {
              CompetitionId = CompGuids[4],
              UserId = UserGuids[0],
              Ledger = null,
              Target = 120
            },
            new Participant {
              CompetitionId = CompGuids[4],
              UserId = UserGuids[1],
              Ledger = null,
              Target = 120
            },
            new Participant {
              CompetitionId = CompGuids[4],
              UserId = UserGuids[2],
              Ledger = null,
              Target = 120
            },
            new Participant {
              CompetitionId = CompGuids[5],
              UserId = UserGuids[1],
              Ledger = "[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]",
              Target = 120
            },
            new Participant {
              CompetitionId = CompGuids[5],
              UserId = UserGuids[5],
              Ledger = "[2, 15, 3, 14, 4, 13, 5, 12, 6, 11, 7, 10, 8, 9]",
              Target = 120
            },
            new Participant {
              CompetitionId = CompGuids[5],
              UserId = UserGuids[6],
              Ledger = "[8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7]",
              Target = 100
            },
            new Participant {
              CompetitionId = CompGuids[6],
              UserId = UserGuids[1],
              Ledger = null
            },
            new Participant {
              CompetitionId = CompGuids[6],
              UserId = UserGuids[2],
              Ledger = null
            },
            new Participant {
              CompetitionId = CompGuids[6],
              UserId = UserGuids[5],
              Ledger = null
            },
            //11
            new Participant {
              CompetitionId = CompGuids[7],
              UserId = UserGuids[2],
              Ledger = null,
              Target = 120
            },
            new Participant {
              CompetitionId = CompGuids[7],
              UserId = UserGuids[5],
              Ledger = null,
              Target = 130
            },
          };

          foreach (var participant in participants)
          {
            context.Participants.Add(participant);
          }

          await context.SaveChangesAsync();
        }

        if (!context.Admins.Any())
        {
          var admins = new List<Admin> {
            new Admin {
              CompetitionId = CompGuids[0],
              UserId = UserGuids[1]
            },
            new Admin {
              CompetitionId = CompGuids[0],
              UserId = UserGuids[2]
            },
            new Admin {
              CompetitionId = CompGuids[1],
              UserId = UserGuids[0]
            },
            new Admin {
              CompetitionId = CompGuids[1],
              UserId = UserGuids[1]
            },
            new Admin {
              CompetitionId = CompGuids[2],
              UserId = UserGuids[0]
            },
            new Admin {
              CompetitionId = CompGuids[3],
              UserId = UserGuids[2]
            },
            new Admin {
              CompetitionId = CompGuids[4],
              UserId = UserGuids[0]
            },
            new Admin {
              CompetitionId = CompGuids[4],
              UserId = UserGuids[1]
            },
            new Admin {
              CompetitionId = CompGuids[5],
              UserId = UserGuids[1]
            },
            new Admin {
              CompetitionId = CompGuids[6],
              UserId = UserGuids[5]
            },
            new Admin {
              CompetitionId = CompGuids[7],
              UserId = UserGuids[2]
            },
          };

          foreach (var admin in admins)
          {
            context.Admins.Add(admin);
          }

          await context.SaveChangesAsync();
        }

        if (!context.Invitations.Any())
        {
          var invitations = new List<Invitation> {
            new Invitation {
              CompetitionId = CompGuids[4],
              UserId = UserGuids[6]
            },
            new Invitation {
              CompetitionId = CompGuids[7],
              UserId = UserGuids[0]
            },
          };

          foreach (var invitation in invitations)
          {
            context.Invitations.Add(invitation);
          }

          await context.SaveChangesAsync();
        }

        if (!context.ParticipationRequests.Any())
        {
          var participationRequests = new List<ParticipationRequest> {
            new ParticipationRequest {
              CompetitionId = CompGuids[4],
              UserId = UserGuids[5]
            }
          };

          foreach (var participationRequest in participationRequests)
          {
            context.ParticipationRequests.Add(participationRequest);
          }

          await context.SaveChangesAsync();
        }

        if (!context.AdminRequests.Any())
        {
          var adminRequests = new List<AdminRequest> {
            new AdminRequest {
              CompetitionId = CompGuids[4],
              UserId = UserGuids[5]
            }
          };

          foreach (var adminRequest in adminRequests)
          {
            context.AdminRequests.Add(adminRequest);
          }

          await context.SaveChangesAsync();
        }

        if (!context.Notifications.Any())
        {

        }

        if (!context.Comments.Any())
        {

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
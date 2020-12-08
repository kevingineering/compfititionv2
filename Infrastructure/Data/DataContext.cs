using System.Reflection;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {

    }

    public DbSet<UserGoal> UserGoals { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<UserFriendRequest> UserFriendRequests { get; set; }
    public DbSet<UserFriendship> UserFriendships { get; set; }
    public DbSet<CompetitionGoal> CompetitionGoals { get; set; }
    public DbSet<CompetitionParticipant> CompetitionParticipants { get; set; }
    public DbSet<CompetitionAdmin> CompetitionAdmins { get; set; }
    public DbSet<CompetitionComment> CompetitionComments { get; set; }
    public DbSet<CompetitionParticipantRequest> CompetitionParticipantRequests { get; set; }
    public DbSet<CompetitionAdminRequest> CompetitionAdminRequests { get; set; }
    public DbSet<CompetitionInvite> CompetitionInvites { get; set; }
    public DbSet<UserNotification> UserNotifications { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);
      modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
  }
}
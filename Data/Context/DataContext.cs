using System.Reflection;
using Core.Entity;
using Microsoft.EntityFrameworkCore;

namespace Data.Context
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {

    }

    public DbSet<User> Users { get; set; }
    public DbSet<Challenge> Challenges { get; set; }
    public DbSet<Goal> Goals { get; set; }
    public DbSet<FriendRequest> FriendRequests { get; set; }
    public DbSet<Friendship> Friendships { get; set; }
    public DbSet<Competition> Competitions { get; set; }
    public DbSet<Participant> Participants { get; set; }
    public DbSet<Admin> Admins { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<ParticipationRequest> ParticipationRequests { get; set; }
    public DbSet<AdminRequest> AdminRequests { get; set; }
    public DbSet<Invitation> Invitations { get; set; }
    public DbSet<Notification> Notifications { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);
      modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
  }
}
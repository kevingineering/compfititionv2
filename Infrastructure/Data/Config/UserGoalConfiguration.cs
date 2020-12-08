using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
  public class UserGoalConfiguration : IEntityTypeConfiguration<UserGoal>
  {
    public void Configure(EntityTypeBuilder<UserGoal> builder)
    {
      builder.Property(g => g.Id).IsRequired();
      builder.Property(g => g.Name).IsRequired().HasMaxLength(50);
      builder.Property(g => g.Duration).IsRequired();
      builder.Property(g => g.StartTime).IsRequired();
      builder.Property(g => g.Type).IsRequired();
      builder.Property(g => g.Description);
      builder.Property(g => g.Units).HasMaxLength(20);
      builder.Property(g => g.Target).IsRequired();
      builder.Property(g => g.IsPrivate).IsRequired();

      builder.HasOne(g => g.User)
        .WithMany(u => u.UserGoals)
        .HasForeignKey(g => g.UserId)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}
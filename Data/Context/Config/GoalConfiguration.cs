using Core.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Context.Config
{
  public class GoalConfiguration : IEntityTypeConfiguration<Goal>
  {
    public void Configure(EntityTypeBuilder<Goal> builder)
    {
      builder.HasKey(g => g.GoalId);

      builder.Property(g => g.IsPrivate).IsRequired();

      builder.HasOne(g => g.User)
        .WithMany(u => u.Goals)
        .HasForeignKey(g => g.UserId)
        .OnDelete(DeleteBehavior.Cascade);

      builder.HasOne(g => g.Challenge)
        .WithOne(ch => ch.Goal)
        .HasForeignKey<Goal>(c => c.ChallengeId)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}
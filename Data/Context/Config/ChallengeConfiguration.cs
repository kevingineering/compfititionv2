using Core.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Context.Config
{
  public class ChallengeConfiguration : IEntityTypeConfiguration<Challenge>
  {
    public void Configure(EntityTypeBuilder<Challenge> builder)
    {
      builder.HasKey(ch => ch.ChallengeId);

      builder.Property(ch => ch.Name).IsRequired().HasMaxLength(50);
      builder.Property(ch => ch.Duration).IsRequired();
      builder.Property(ch => ch.StartTime).IsRequired();
      builder.Property(ch => ch.Category).IsRequired();
      builder.Property(ch => ch.Units).HasMaxLength(20);

      // builder.HasOne(ch => ch.Goal)
      //   .WithOne(g => g.Challenge)
      //   .HasForeignKey<Goal>(ch => ch.GoalId)
      //   .OnDelete(DeleteBehavior.Cascade);

      // builder.HasOne(ch => ch.Competition)
      //   .WithOne(g => g.Challenge)
      //   .HasForeignKey<Competition>(ch => ch.CompetitionId)
      //   .OnDelete(DeleteBehavior.Cascade);
    }
  }
}
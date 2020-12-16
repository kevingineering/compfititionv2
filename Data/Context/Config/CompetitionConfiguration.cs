using Core.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Context.Config
{
  public class CompetitionConfiguration : IEntityTypeConfiguration<Competition>
  {
    public void Configure(EntityTypeBuilder<Competition> builder)
    {
      builder.HasKey(c => c.CompetitionId);

      builder.Property(c => c.IsHighestScoreWins).IsRequired();
      builder.Property(c => c.IsPrivate).IsRequired();

      builder.HasOne(c => c.Challenge)
        .WithOne(ch => ch.Competition)
        .HasForeignKey<Competition>(c => c.ChallengeId)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}

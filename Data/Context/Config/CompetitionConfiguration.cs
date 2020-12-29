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

      //TODO - DELETE CHALLENGE WITH COMPETITION
      builder.HasOne(g => g.Challenge)
      // .WithOne(ch => ch.Competition)
      .WithOne()
      .HasForeignKey<Competition>(c => c.ChallengeId)
      .OnDelete(DeleteBehavior.Cascade);
    }
  }
}
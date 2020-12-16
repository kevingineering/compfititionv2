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
    }
  }
}
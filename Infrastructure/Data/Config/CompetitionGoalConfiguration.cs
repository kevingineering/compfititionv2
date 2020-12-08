using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
  public class CompetitionGoalConfiguration : IEntityTypeConfiguration<CompetitionGoal>
  {
    public void Configure(EntityTypeBuilder<CompetitionGoal> builder)
    {
      builder.Property(c => c.Id).IsRequired();
      builder.Property(c => c.Name).IsRequired().HasMaxLength(50);
      builder.Property(c => c.Duration).IsRequired();
      builder.Property(c => c.StartTime).IsRequired();
      builder.Property(c => c.Type).IsRequired();
      builder.Property(c => c.Description);
      builder.Property(c => c.Units).HasMaxLength(20);
      builder.Property(c => c.IsPrivate).IsRequired();
    }
  }
}

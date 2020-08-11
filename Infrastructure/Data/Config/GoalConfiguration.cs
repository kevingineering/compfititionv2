using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
  public class GoalConfiguration : IEntityTypeConfiguration<Goal>
  {
    public void Configure(EntityTypeBuilder<Goal> builder)
    {
      builder.Property(g => g.Id).IsRequired();
      builder.Property(g => g.Name).IsRequired().HasMaxLength(50);
      builder.Property(g => g.Duration).IsRequired();
      builder.Property(g => g.StartDate).IsRequired();
      builder.Property(g => g.Type).IsRequired();
      builder.Property(g => g.Description);
      builder.Property(g => g.Units).HasMaxLength(20);
      builder.Property(g => g.Total).IsRequired();
      builder.Property(g => g.IsPrivate).IsRequired();
      builder.Property(g => g.CompId);
      builder.Property(g => g.Tracker);
      builder.HasOne(u => u.User).WithMany()
        .HasForeignKey(g => g.UserId);
    }
  }
}
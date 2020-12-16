using Core.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Context.Config
{
  public class CompetitionAdminConfiguration : IEntityTypeConfiguration<Admin>
  {
    public void Configure(EntityTypeBuilder<Admin> builder)
    {
      builder.HasKey(a => new { a.UserId, a.CompetitionId });

      builder.HasOne(a => a.Competition)
        .WithMany(c => c.Admins)
        .HasForeignKey(a => a.CompetitionId)
        .OnDelete(DeleteBehavior.Cascade);

      builder.HasOne(a => a.User)
        .WithMany(u => u.Admins)
        .HasForeignKey(a => a.UserId)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}

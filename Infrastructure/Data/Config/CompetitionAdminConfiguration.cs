using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
  public class CompetitionAdminConfiguration : IEntityTypeConfiguration<CompetitionAdmin>
  {
    public void Configure(EntityTypeBuilder<CompetitionAdmin> builder)
    {
      //combination key
      builder.HasKey(k => new { k.CompId, k.UserId });

      builder.HasOne(a => a.Comp)
        .WithMany(c => c.Admins)
        .HasForeignKey(a => a.CompId)
        .OnDelete(DeleteBehavior.Cascade);

      builder.HasOne(a => a.User)
        .WithMany(u => u.AdminJobs)
        .HasForeignKey(a => a.UserId)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}

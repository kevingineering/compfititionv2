using Core.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Context.Config
{
  public class AdminRequestConfiguration : IEntityTypeConfiguration<AdminRequest>
  {
    public void Configure(EntityTypeBuilder<AdminRequest> builder)
    {
      builder.HasKey(ar => new { ar.UserId, ar.CompetitionId });

      builder.HasOne(ar => ar.Competition)
        .WithMany(c => c.AdminRequests)
        .HasForeignKey(ar => ar.CompetitionId)
        .OnDelete(DeleteBehavior.Cascade);

      builder.HasOne(ar => ar.User)
        .WithMany(u => u.AdminRequests)
        .HasForeignKey(ar => ar.UserId)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}
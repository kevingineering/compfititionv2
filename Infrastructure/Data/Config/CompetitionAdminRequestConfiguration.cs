using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
  public class CompetitionAdminRequestConfiguration : IEntityTypeConfiguration<CompetitionAdminRequest>
  {
    public void Configure(EntityTypeBuilder<CompetitionAdminRequest> builder)
    {
      //combination key
      builder.HasKey(k => new { k.CompId, k.ParticipantId });

      builder.HasOne(ar => ar.Comp)
        .WithMany(c => c.AdminRequests)
        .HasForeignKey(ar => ar.CompId)
        .OnDelete(DeleteBehavior.Cascade);

      builder.HasOne(ar => ar.Participant)
        .WithMany(u => u.AdminRequests)
        .HasForeignKey(ar => ar.ParticipantId)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}
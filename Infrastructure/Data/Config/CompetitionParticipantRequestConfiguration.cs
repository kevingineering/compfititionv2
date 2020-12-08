using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
  public class CompetitionParticipantRequestConfiguration : IEntityTypeConfiguration<CompetitionParticipantRequest>
  {
    public void Configure(EntityTypeBuilder<CompetitionParticipantRequest> builder)
    {
      //combination key
      builder.HasKey(k => new { k.CompId, k.RequesterId });

      builder.HasOne(pr => pr.Comp)
        .WithMany(c => c.ParticipantRequests)
        .HasForeignKey(pr => pr.CompId)
        .OnDelete(DeleteBehavior.Cascade);

      builder.HasOne(pr => pr.Requester)
        .WithMany(u => u.ParticipantRequests)
        .HasForeignKey(pr => pr.RequesterId)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}
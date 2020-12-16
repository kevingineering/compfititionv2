using Core.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Context.Config
{
  public class CompetitionParticipantRequestConfiguration : IEntityTypeConfiguration<ParticipationRequest>
  {
    public void Configure(EntityTypeBuilder<ParticipationRequest> builder)
    {
      //combination key
      builder.HasKey(pr => new { pr.UserId, pr.CompetitionId });

      builder.HasOne(pr => pr.Competition)
        .WithMany(c => c.ParticipationRequests)
        .HasForeignKey(pr => pr.CompetitionId)
        .OnDelete(DeleteBehavior.Cascade);

      builder.HasOne(pr => pr.User)
        .WithMany(u => u.ParticipationRequests)
        .HasForeignKey(pr => pr.UserId)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}
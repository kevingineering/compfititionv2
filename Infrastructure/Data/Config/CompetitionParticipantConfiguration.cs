using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
  public class CompetitionParticipantConfiguration : IEntityTypeConfiguration<CompetitionParticipant>
  {
    public void Configure(EntityTypeBuilder<CompetitionParticipant> builder)
    {
      builder.HasComment("Competition Participant");

      //combination key
      builder.HasKey(k => new { k.CompId, k.UserId });

      builder.HasOne(p => p.CompGoal)
        .WithMany(c => c.Participants)
        .HasForeignKey(p => p.CompId)
        .OnDelete(DeleteBehavior.Cascade);

      builder.HasOne(p => p.User)
        .WithMany(u => u.Participations)
        .HasForeignKey(p => p.UserId)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}

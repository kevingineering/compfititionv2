using Core.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Context.Config
{
  public class CompetitionParticipantConfiguration : IEntityTypeConfiguration<Participant>
  {
    public void Configure(EntityTypeBuilder<Participant> builder)
    {
      builder.HasKey(p => new { p.UserId, p.CompetitionId });

      builder.HasOne(p => p.Competition)
        .WithMany(c => c.Participants)
        .HasForeignKey(p => p.CompetitionId)
        .OnDelete(DeleteBehavior.Cascade);

      builder.HasOne(p => p.User)
        .WithMany(u => u.Participations)
        .HasForeignKey(p => p.UserId)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}

using Core.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Context.Config
{
  public class CompetitionInviteConfiguration : IEntityTypeConfiguration<Invitation>
  {
    public void Configure(EntityTypeBuilder<Invitation> builder)
    {
      builder.HasKey(i => new { i.UserId, i.CompetitionId });

      builder.HasOne(i => i.Competition)
        .WithMany(c => c.Invitations)
        .HasForeignKey(i => i.CompetitionId)
        .OnDelete(DeleteBehavior.Cascade);

      builder.HasOne(i => i.User)
        .WithMany(u => u.Invitations)
        .HasForeignKey(i => i.UserId)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}
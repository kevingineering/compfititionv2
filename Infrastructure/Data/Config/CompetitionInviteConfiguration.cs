using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
  public class CompetitionInviteConfiguration : IEntityTypeConfiguration<CompetitionInvite>
  {
    public void Configure(EntityTypeBuilder<CompetitionInvite> builder)
    {
      //combination key
      builder.HasKey(k => new { k.CompId, k.InviteeId });

      builder.HasOne(i => i.Comp)
        .WithMany(c => c.Invites)
        .HasForeignKey(i => i.CompId)
        .OnDelete(DeleteBehavior.Cascade);

      builder.HasOne(i => i.Invitee)
        .WithMany(u => u.Invites)
        .HasForeignKey(i => i.InviteeId)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}
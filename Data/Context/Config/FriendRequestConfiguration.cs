using Core.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Context.Config
{
  public class FriendRequestConfiguration : IEntityTypeConfiguration<FriendRequest>
  {
    public void Configure(EntityTypeBuilder<FriendRequest> builder)
    {
      builder.HasKey(fr => new { fr.SenderId, fr.ReceiverId });

      builder.HasOne(fr => fr.Receiver)
        .WithMany(u => u.Receivers)
        .HasForeignKey(fr => fr.ReceiverId)
        .OnDelete(DeleteBehavior.Cascade);

      builder.HasOne(fr => fr.Sender)
        .WithMany(u => u.Senders)
        .HasForeignKey(fr => fr.SenderId)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}
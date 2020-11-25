using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
  public class UserFriendRequestConfiguration : IEntityTypeConfiguration<UserFriendRequest>
  {
    public void Configure(EntityTypeBuilder<UserFriendRequest> builder)
    {
      builder.HasComment("User Friend Request");

      //combination key
      builder.HasKey(k => new { k.SenderId, k.ReceiverId });

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
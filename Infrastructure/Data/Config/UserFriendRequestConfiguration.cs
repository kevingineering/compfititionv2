using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
  public class UserFriendRequestConfiguration : IEntityTypeConfiguration<UserFriendRequest>
  {
    public void Configure(EntityTypeBuilder<UserFriendRequest> builder)
    {
      //combination key
      builder.HasKey(k => new { k.RequesterId, k.RequesteeId });

      builder.HasOne(u => u.Requestee)
        .WithMany(u => u.Requestees)
        .HasForeignKey(u => u.RequesteeId)
        .OnDelete(DeleteBehavior.Cascade);

      builder.HasOne(u => u.Requester)
        .WithMany(u => u.Requesters)
        .HasForeignKey(u => u.RequesterId)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}
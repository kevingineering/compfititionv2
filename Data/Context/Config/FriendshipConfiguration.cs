using Core.Entity;
using Microsoft.EntityFrameworkCore;

namespace Data.Context.Config
{
  public class UserFriendConfiguration : IEntityTypeConfiguration<Friendship>
  {
    public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Friendship> builder)
    {
      builder.HasKey(f => new { f.User1Id, f.User2Id });

      builder.HasOne(f => f.User1)
        .WithMany(u => u.User1Friends)
        .HasForeignKey(f => f.User1Id)
        .OnDelete(DeleteBehavior.Cascade);

      builder.HasOne(f => f.User2)
        .WithMany(u => u.User2Friends)
        .HasForeignKey(f => f.User2Id)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}
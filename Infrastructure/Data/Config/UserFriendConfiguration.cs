using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Config
{
  public class UserFriendConfiguration : IEntityTypeConfiguration<UserFriendship>
  {
    public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<UserFriendship> builder)
    {
      //combination key
      builder.HasKey(k => new { k.User1Id, k.User2Id });

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
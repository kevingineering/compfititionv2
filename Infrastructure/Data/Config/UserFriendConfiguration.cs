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

      builder.HasOne(u => u.User1)
        .WithMany(u => u.User1Friends)
        .HasForeignKey(u => u.User1Id)
        .OnDelete(DeleteBehavior.Cascade);

      builder.HasOne(u => u.User2)
        .WithMany(u => u.User2Friends)
        .HasForeignKey(u => u.User2Id)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
  public class UserNotificationConfiguration : IEntityTypeConfiguration<UserNotification>
  {
    public void Configure(EntityTypeBuilder<UserNotification> builder)
    {
      builder.Property(n => n.Id).IsRequired();
      builder.Property(n => n.Message).IsRequired();

      builder.HasOne(n => n.User)
        .WithMany(u => u.Notifications)
        .HasForeignKey(n => n.UserId)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}
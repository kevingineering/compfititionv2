using Core.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Context.Config
{
  public class UserNotificationConfiguration : IEntityTypeConfiguration<Notification>
  {
    public void Configure(EntityTypeBuilder<Notification> builder)
    {
      builder.HasKey(n => n.NotificationId);

      builder.Property(n => n.Message).IsRequired();

      builder.HasOne(n => n.User)
        .WithMany(u => u.Notifications)
        .HasForeignKey(n => n.UserId)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}
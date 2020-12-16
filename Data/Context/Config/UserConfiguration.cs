using Core.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Context.Config
{
  public class UserConfiguration : IEntityTypeConfiguration<User>
  {
    public void Configure(EntityTypeBuilder<User> builder)
    {
      builder.HasKey(u => u.UserId);

      builder.Property(u => u.Name).IsRequired().HasMaxLength(50);
      builder.Property(u => u.Email).IsRequired().HasMaxLength(50);
      builder.Property(u => u.Password).IsRequired();
      builder.Property(u => u.RegisterDate).IsRequired();
      builder.Property(u => u.IsSearchable).IsRequired();

      builder.HasIndex(u => u.Email).IsUnique();
    }
  }
}
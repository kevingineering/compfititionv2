using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
  public class UserConfiguration : IEntityTypeConfiguration<User>
  {
    public void Configure(EntityTypeBuilder<User> builder)
    {
      builder.Property(u => u.Id).IsRequired();
      builder.Property(u => u.Name).IsRequired().HasMaxLength(50);
      builder.Property(u => u.Email).IsRequired().HasMaxLength(50);
      builder.Property(u => u.Password).IsRequired();
      builder.Property(u => u.RegisterDate).IsRequired();
      builder.Property(u => u.IsSearchable).IsRequired();

      builder.HasIndex(u => u.Email).IsUnique();
    }
  }
}
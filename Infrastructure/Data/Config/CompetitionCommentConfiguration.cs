using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
  public class CompetitionCommentConfiguration : IEntityTypeConfiguration<CompetitionComment>
  {
    public void Configure(EntityTypeBuilder<CompetitionComment> builder)
    {
      builder.Property(p => p.Id).IsRequired();
      builder.Property(p => p.CompId).IsRequired();
      builder.Property(p => p.Body).IsRequired();
      builder.Property(p => p.AuthorId).IsRequired();
      builder.Property(p => p.CreatedAt).IsRequired();

      builder.HasOne(p => p.Comp)
        .WithMany(c => c.Comments)
        .HasForeignKey(p => p.CompId)
        .OnDelete(DeleteBehavior.Cascade);

      builder.HasOne(p => p.Author)
        .WithMany(u => u.Comments)
        .HasForeignKey(p => p.AuthorId)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}

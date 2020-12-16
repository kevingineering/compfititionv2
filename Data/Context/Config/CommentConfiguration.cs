using Core.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Context.Config
{
  public class CompetitionCommentConfiguration : IEntityTypeConfiguration<Comment>
  {
    public void Configure(EntityTypeBuilder<Comment> builder)
    {
      builder.HasKey(co => co.CommentId);

      builder.Property(co => co.UserId).IsRequired();
      builder.Property(co => co.CompetitionId).IsRequired();
      builder.Property(co => co.Body).IsRequired();
      builder.Property(co => co.CreatedAt).IsRequired();

      builder.HasOne(c => c.Competition)
        .WithMany(co => co.Comments)
        .HasForeignKey(c => c.CompetitionId)
        .OnDelete(DeleteBehavior.Cascade);

      builder.HasOne(co => co.User)
        .WithMany(u => u.Comments)
        .HasForeignKey(co => co.UserId)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}

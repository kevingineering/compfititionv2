using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
  public class CompetitionLetterConfiguration : IEntityTypeConfiguration<CompetitionLetter>
  {
    public void Configure(EntityTypeBuilder<CompetitionLetter> builder)
    {
      builder.HasComment("Competition Letter");

      builder.Property(l => l.Id).IsRequired();
      builder.Property(l => l.CompId).IsRequired();
      builder.Property(l => l.ReceiverId).IsRequired();
      builder.Property(l => l.Type).IsRequired();

      builder.HasOne(l => l.Receiver)
        .WithMany(u => u.LettersReceived)
        .HasForeignKey(l => l.ReceiverId)
        .OnDelete(DeleteBehavior.Cascade);

      builder.HasOne(l => l.Comp)
        .WithMany(c => c.Letters)
        .HasForeignKey(l => l.CompId)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}

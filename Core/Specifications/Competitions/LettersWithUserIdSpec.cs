using System;
using Core.Entities;

namespace Core.Specifications.Competitions
{
  public class LettersWithUserIdSpec : BaseSpecification<CompetitionLetter>
  {
    public LettersWithUserIdSpec(Guid userId) : base(x => x.ReceiverId == userId)
    {

    }
  }
}
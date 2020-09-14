using System;
using Core.Entities;

namespace Core.Specifications.Goals
{
  public class PublicGoalsWithUserIdSpec : BaseSpecification<Goal>
  {
    public PublicGoalsWithUserIdSpec(Guid id) : base(x => x.UserId == id && x.IsPrivate == false)
    {

    }
  }
}
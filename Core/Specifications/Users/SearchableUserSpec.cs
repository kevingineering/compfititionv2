using Core.Entities;

namespace Core.Specifications.Users
{
  public class SearchableUserSpec : BaseSpecification<User>
  {
    public SearchableUserSpec() : base(x => x.IsSearchable)
    {

    }
  }
}
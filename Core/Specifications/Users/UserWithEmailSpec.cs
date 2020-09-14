using Core.Entities;

namespace Core.Specifications.Users
{
  public class UserWithEmailSpec : BaseSpecification<User>
  {
    public UserWithEmailSpec(string email) : base(x => x.Email == email)
    {

    }
  }
}
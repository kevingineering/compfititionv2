namespace Core.Interfaces
{
  public interface IPasswordUtility
  {
    string HashPassword(string password);
    void CheckPassword(string inputPassword, string hashedPassword);
  }
}
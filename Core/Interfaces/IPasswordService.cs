namespace Core.Interfaces
{
  public interface IPasswordService
  {
    string HashPassword(string password);
    bool CheckPassword(string inputPassword, string hashedPassword);
  }
}
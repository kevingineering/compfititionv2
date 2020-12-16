using System.ComponentModel.DataAnnotations;

namespace Infrastructure.Models.Request
{
  public class RegisterRequest
  {
    [Required]
    public string Name { get; set; }
    [Required]
    [RegularExpression("(^[\\w-]+@([\\w-]+\\.)+[\\w-]{2,4}$)", ErrorMessage = "Email must be a valid email address.")]
    public string Email { get; set; }
    [Required]
    [RegularExpression("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\-=[\\]{};':\"\\|,.<>?]).{8,}$", ErrorMessage = "Password must have a lowercase letter, uppercase letter, special symbol, number, and between eight and twenty characters.")]
    //regex from https://regexlib.com/Search.aspx?k=password - ctrl + f "microsoft" - added \ to escape characters
    public string Password { get; set; }
    public bool IsSearchable { get; set; } = false;
  }
}
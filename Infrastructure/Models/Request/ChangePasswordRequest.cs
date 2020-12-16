using System.ComponentModel.DataAnnotations;

namespace Infrastructure.Models.Request
{
  public class ChangePasswordRequest
  {
    [Required]
    public string OldPassword { get; set; }
    [Required]
    [RegularExpression("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\-=[\\]{};':\"\\|,.<>?]).{8,}$", ErrorMessage = "Password must have a lowercase letter, uppercase letter, special symbol, number, and between eight and twenty characters.")]
    public string NewPassword { get; set; }
  }
}
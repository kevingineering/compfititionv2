using System.ComponentModel.DataAnnotations;

namespace Infrastructure.Models.Request
{
  public class PasswordRequest
  {
    [Required]
    public string Password { get; set; }
  }
}
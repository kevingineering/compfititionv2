using System.ComponentModel.DataAnnotations;

namespace API.DTOs.UserDTOs
{
  public class PasswordDTO
  {
    [Required]
    public string Password { get; set; }
  }
}
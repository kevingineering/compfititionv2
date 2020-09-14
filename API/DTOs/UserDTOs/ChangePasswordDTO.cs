using System.ComponentModel.DataAnnotations;

namespace API.DTOs.UserDTOs
{
  public class ChangePasswordDTO
  {
    [Required]
    public string OldPassword { get; set; }
    [Required]
    public string NewPassword { get; set; }
  }
}
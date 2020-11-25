using System.ComponentModel.DataAnnotations;

namespace API.DTOs.InputDTOs
{
  public class ChangePasswordInputDTO
  {
    [Required]
    public string OldPassword { get; set; }
    [Required]
    public string NewPassword { get; set; }
  }
}
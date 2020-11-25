using System.ComponentModel.DataAnnotations;

namespace API.DTOs.InputDTOs
{
  public class PasswordInputDTO
  {
    [Required]
    public string Password { get; set; }
  }
}
using System.ComponentModel.DataAnnotations;

namespace API.DTOs.InputDTOs
{
  public class LoginInputDTO
  {
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
  }
}
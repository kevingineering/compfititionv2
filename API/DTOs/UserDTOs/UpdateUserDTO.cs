using System.ComponentModel.DataAnnotations;

namespace API.DTOs.UserDTOs
{
  public class UpdateUserDTO
  {
    [Required]
    public string Name { get; set; }
    [Required]
    public string Email { get; set; }
    public bool IsSearchable { get; set; } = false;
  }
}
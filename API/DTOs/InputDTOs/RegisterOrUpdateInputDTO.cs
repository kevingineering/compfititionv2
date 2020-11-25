using System.ComponentModel.DataAnnotations;

namespace API.DTOs.InputDTOs
{
  public class RegisterOrUpdateInputDTO
  {
    [Required]
    public string Name { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    [RegularExpression("(?=^.{6,20}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$", ErrorMessage = "Password must have a lowercase letter, uppercase letter, special symbol, number, and between six and twenty characters.")]
    //regex from https://regexlib.com/Search.aspx?k=password - ctrl + f "microsoft" - added \ to escape characters
    public string Password { get; set; }
    public bool IsSearchable { get; set; } = false;
  }
}
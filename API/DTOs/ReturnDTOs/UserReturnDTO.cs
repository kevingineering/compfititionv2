using System;

namespace API.DTOs.ReturnDTOs
{
  public class UserReturnDTO
  {
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public string Token { get; set; }
    public bool IsSearchable { get; set; }
  }
}
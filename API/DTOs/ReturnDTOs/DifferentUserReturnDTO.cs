using System;

namespace API.DTOs.ReturnDTOs
{
  public class DifferentUserReturnDTO
  {
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
  }
}
using System;

namespace API.DTOs.ReturnDTOs
{
  public class GoalReturnDTO
  {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Duration { get; set; }
    public DateTime StartDate { get; set; }
    public string Type { get; set; }
    public string Description { get; set; }
    public string Units { get; set; }
    public decimal Target { get; set; }
    public bool IsPrivate { get; set; }
    public string Ledger { get; set; }
    public decimal? InitialValue { get; set; }
  }
}
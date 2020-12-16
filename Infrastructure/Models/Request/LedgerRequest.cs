using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Infrastructure.Models.Request
{
  public class LedgerRequest
  {
    [Required]
    public Guid GoalId { get; set; }
    [Required]
    public List<decimal?> Ledger { get; set; }
  }
}
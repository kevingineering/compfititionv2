using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs.InputDTOs
{
  public class LedgerInputDTO
  {
    [Required]
    public Guid Id { get; set; }
    [Required]
    public List<decimal?> Ledger { get; set; }
  }
}
using System;

namespace Core.Entities
{
  public class CompetitionAdmin : BaseEntity
  {
    public CompetitionAdmin(Guid compId, Guid userId)
    {
      CompId = compId;
      UserId = userId;
    }

    //parameterless constructor required by EF
    public CompetitionAdmin()
    {

    }
    //Compound Key
    public Guid CompId { get; set; }
    public Guid UserId { get; set; }

    //relationships
    // [JsonIgnore]
    public virtual CompetitionGoal Comp { get; set; }
    // [JsonIgnore]
    public virtual User User { get; set; }
  }
}
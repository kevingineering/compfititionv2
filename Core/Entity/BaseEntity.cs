using Core.Errors;

namespace Core.Entity
{
  public abstract class BaseEntity
  {
    internal virtual string StyledName { get; } = "Entity";
  }

  //extension method allows this to be null
  public static class BaseEntityExtensionMethod
  {
    public static void EnsureExists(this BaseEntity T, string message)
    {
      if (T == null)
      {
        throw new ApiError(404, message);
      }
    }

    public static void EnsureDoesNotExist(this BaseEntity T, string message = null)
    {
      if (T != null)
      {
        throw new ApiError(400, message != null ? message : T.StyledName + " already exists.");
      }
    }
  }
}
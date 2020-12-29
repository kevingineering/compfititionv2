using System;
using System.Threading.Tasks;

namespace Infrastructure.Signatures
{
  public interface IAdminRequestService
  {
    Task AddAdminRequest(Guid differentUserId, Guid competitionId);
    Task DeleteRequest(Guid userId, Guid competitionId);
  }
}
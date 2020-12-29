using System;
using System.Threading.Tasks;
using Core.Entity;
using Core.Interfaces.Repos;
using Infrastructure.Signatures;

namespace Infrastructure.Services
{
  public class AdminRequestService : IAdminRequestService
  {
    private readonly IAdminRequestRepo _adminRequestRepo;
    private readonly IAdminRepo _adminRepo;

    public AdminRequestService(IAdminRequestRepo adminRequestRepo, IAdminRepo adminRepo)
    {
      _adminRequestRepo = adminRequestRepo;
      _adminRepo = adminRepo;
    }

    public async Task AddAdminRequest(Guid differentUserId, Guid competitionId)
    {
      var existingAdminRequest = await _adminRequestRepo.Get(differentUserId, competitionId);
      existingAdminRequest.EnsureDoesNotExist();

      var existingAdmin = await _adminRepo.Get(differentUserId, competitionId);
      existingAdmin.EnsureDoesNotExist();

      _adminRequestRepo.Create(new AdminRequest(differentUserId, competitionId));
      await _adminRequestRepo.Save();
    }

    public async Task DeleteRequest(Guid userId, Guid competitionId)
    {
      var existingAdminRequest = await _adminRequestRepo.Get(userId, competitionId);
      existingAdminRequest.EnsureExists("Admin request not found.");

      _adminRequestRepo.Delete(existingAdminRequest);
      await _adminRequestRepo.Save();
    }
  }
}
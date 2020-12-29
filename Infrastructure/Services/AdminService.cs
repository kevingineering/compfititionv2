using System;
using System.Linq;
using System.Threading.Tasks;
using Core.Entity;
using Core.Errors;
using Core.Interfaces.Repos;
using Infrastructure.Models.Response;
using Infrastructure.Signatures;

namespace Infrastructure.Services
{
  public class AdminService : IAdminService
  {
    private readonly IAdminRepo _adminRepo;
    private readonly IAdminRequestRepo _adminRequestRepo;
    private readonly ICompetitionRepo _competitionRepo;
    private readonly IMappingService _mappingService;

    public AdminService(IAdminRepo adminRepo, ICompetitionRepo competitionRepo, IAdminRequestRepo adminRequestRepo, IMappingService mappingService)
    {
      _adminRepo = adminRepo;
      _adminRequestRepo = adminRequestRepo;
      _competitionRepo = competitionRepo;
      _mappingService = mappingService;
    }

    public async Task<CompetitionResponse> AddAdminToCompetition(Guid userId, Guid competitionId)
    {
      var existingAdmin = await _adminRepo.Get(userId, competitionId);
      existingAdmin.EnsureDoesNotExist();

      var existingAdminRequest = await _adminRequestRepo.Get(userId, competitionId);
      existingAdminRequest.EnsureExists("Admin request not found.");

      _adminRepo.Create(new Admin(userId, competitionId));
      _adminRequestRepo.Delete(existingAdminRequest);
      await _adminRepo.Save();

      //return competition with admin information
      var competition = await _competitionRepo.GetWithInfo(competitionId);
      return new CompetitionResponse(competition, true, userId);
    }

    public async Task<CompetitionResponse> RemoveAdminFromCompetition(Guid userId, Guid competitionId)
    {
      var admins = await _adminRepo.GetList(competitionId);

      //if user is only admin, either: 
      //  promote user who has been asked to be admin OR
      //  inform user they must pass the responsibilities to someone else

      if (admins.Count() == 1)
      {
        var adminRequests = await _adminRequestRepo.GetList(competitionId);
        if (adminRequests.Count() == 0)
        {
          throw new ApiError(403, "You are the only admin in this competition. Ask someone else to be an admin before relinquishing your responsibilitites.");
        }

        var newAdmin = new Admin(adminRequests.First().UserId, competitionId);
        _adminRequestRepo.Delete(adminRequests.First());
        _adminRepo.Create(newAdmin);
      }

      var admin = admins.First(x => x.UserId == userId);
      _adminRepo.Delete(admin);
      await _adminRepo.Save();

      //return competition with admin information
      var competition = await _competitionRepo.GetWithInfo(competitionId);
      return new CompetitionResponse(competition, false, userId);
    }
  }
}
using System;
using System.Threading.Tasks;
using Core.Entity;
using Core.Interfaces;
using Core.Interfaces.Repos;
using Infrastructure.Models.Request;
using Infrastructure.Models.Response;
using Infrastructure.Signatures;

namespace Infrastructure.Services
{
  public class UserService : IUserService
  {
    private readonly IUserRepo _userRepo;
    private readonly IPasswordUtility _passwordUtility;
    private readonly ITokenUtility _tokenUtility;
    private readonly IMappingService _mappingService;

    public UserService(IUserRepo userRepo, IPasswordUtility passwordUtility, ITokenUtility tokenUtility, IMappingService mappingService)
    {
      _userRepo = userRepo;
      _passwordUtility = passwordUtility;
      _tokenUtility = tokenUtility;
      _mappingService = mappingService;
    }

    public async Task<UserResponse> Register(RegisterRequest request)
    {
      var existingUser = await _userRepo.Get(request.Email);
      existingUser.EnsureDoesNotExist("An account already exists for this email address.");

      var hashedPassword = _passwordUtility.HashPassword(request.Password);
      var user = new User(request.Name, request.Email, hashedPassword, request.IsSearchable);

      _userRepo.Create(user);
      await _userRepo.Save();

      var token = _tokenUtility.CreateToken(user);
      return new UserResponse(user, token);
    }

    public async Task<UserResponse> Login(LoginRequest request)
    {
      var user = await _userRepo.Get(request.Email);
      user.EnsureExists("No account found for this email address.");

      _passwordUtility.CheckPassword(request.Password, user.Password);

      var token = _tokenUtility.CreateToken(user);
      return new UserResponse(user, token);
    }

    public async Task<UserResponse> GetUser(Guid userId)
    {
      var user = await _userRepo.Get(userId);
      user.EnsureExists("User not found.");
      var token = _tokenUtility.CreateToken(user);
      return new UserResponse(user, token);
    }

    public async Task<UserInfoResponse> GetUserInfo(Guid userId)
    {
      var user = await _userRepo.GetUserInfo(userId);

      var userInfoResponse = _mappingService.CreateUserInfoResponse(user);

      return userInfoResponse;
    }

    public async Task<UserResponse> UpdateUser(Guid userId, UpdateUserRequest request)
    {
      var user = await _userRepo.Get(userId);
      user.EnsureExists("User not found.");

      if (user.Email != request.Email)
      {
        var existingUser = await _userRepo.Get(request.Email);
        existingUser.EnsureDoesNotExist("An account already exists for this email address.");
      }

      _passwordUtility.CheckPassword(request.Password, user.Password);

      user.Name = request.Name;
      user.Email = request.Email;
      user.IsSearchable = request.IsSearchable;

      _userRepo.Update(user);
      await _userRepo.Save();

      var token = _tokenUtility.CreateToken(user);
      return new UserResponse(user, token);
    }

    public async Task ChangePassword(Guid userId, ChangePasswordRequest request)
    {
      var user = await _userRepo.Get(userId);
      user.EnsureExists("User not found.");

      _passwordUtility.CheckPassword(request.OldPassword, user.Password);
      user.Password = _passwordUtility.HashPassword(request.NewPassword);

      _userRepo.Update(user);
      await _userRepo.Save();
    }

    public async Task DeleteUser(Guid userId, PasswordRequest request)
    {
      var user = await _userRepo.Get(userId);
      user.EnsureExists("User not found.");

      _passwordUtility.CheckPassword(request.Password, user.Password);

      _userRepo.Delete(user);
      await _userRepo.Save();
    }
  }
}
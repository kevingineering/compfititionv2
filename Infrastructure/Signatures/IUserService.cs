using System;
using System.Threading.Tasks;
using Infrastructure.Models.Request;
using Infrastructure.Models.Response;

namespace Infrastructure.Signatures
{
  public interface IUserService
  {
    Task<UserResponse> Register(RegisterRequest request);
    Task<UserResponse> Login(LoginRequest request);
    Task<UserResponse> GetUser(Guid userId);
    Task<UserResponse> UpdateUser(Guid userId, UpdateRequest request);
    Task ChangePassword(Guid userId, ChangePasswordRequest request);
    Task DeleteUser(Guid userId, PasswordRequest request);
  }
}
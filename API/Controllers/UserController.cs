using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs.InputDTOs;
using API.DTOs.ReturnDTOs;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class UserController : BaseController
  {
    // /user
    //   POST    /register           register user
    //   POST    /login              login user
    //   GET     /                   get user
    //   PATCH   /                   update user
    //   PATCH   /changepassword     change password
    //   DELETE  /                   delete user

    private readonly IGenericService<User> _userService;
    private readonly IMapper _mapper;
    private readonly ITokenService _tokenService;
    private readonly IPasswordService _passwordService;

    public UserController(IGenericService<User> userService, IMapper mapper, ITokenService tokenService, IPasswordService passwordService)
    {
      _userService = userService;
      _mapper = mapper;
      _tokenService = tokenService;
      _passwordService = passwordService;
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<UserReturnDTO>> Register(RegisterOrUpdateInputDTO registerDTO)
    {
      //Note: bad password checked by attributes on RegisterInputDTO

      //check if email exists
      var spec = new UserWithEmailSpec(registerDTO.Email);
      var user = await _userService.GetEntityWithSpecAsync(spec);
      if (user != null)
      {
        return BadRequest(new ApiError(400, "An account already exists for this email."));
      }

      //encrypt password
      var hashedPassword = _passwordService.HashPassword(registerDTO.Password);

      //create new user
      var newUser = new User
      {
        Name = registerDTO.Name,
        Email = registerDTO.Email,
        Password = hashedPassword,
        IsSearchable = registerDTO.IsSearchable
      };

      //save user
      user = await _userService.AddAsync(newUser);

      if (user == null)
      {
        return BadRequest(new ApiError(400, "Issue registering."));
      }

      return new UserReturnDTO
      {
        Id = user.Id,
        Email = user.Email,
        Name = user.Name,
        Token = _tokenService.CreateToken(user),
        IsSearchable = user.IsSearchable
      };
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserReturnDTO>> Login(LoginInputDTO loginDTO)
    {
      //get user by email
      var spec = new UserWithEmailSpec(loginDTO.Email);
      var user = await _userService.GetEntityWithSpecAsync(spec);
      if (user == null)
      {
        return Unauthorized(new ApiError(401, "No account found for this email address."));
      }

      //check password
      var isPasswordCorrect = _passwordService.CheckPassword(loginDTO.Password, user.Password);
      if (!isPasswordCorrect)
      {
        return Unauthorized(new ApiError(401, "Incorrect password."));
      }

      return new UserReturnDTO
      {
        Id = user.Id,
        Email = user.Email,
        Name = user.Name,
        Token = _tokenService.CreateToken(user),
        IsSearchable = user.IsSearchable
      };
    }

    [HttpGet]
    public async Task<ActionResult<UserReturnDTO>> GetUser()
    {
      var user = await GetUserFromClaimsPrincipal(HttpContext.User);

      if (user == null)
      {
        return Unauthorized(new ApiError(401, "Invalid token."));
      }

      return new UserReturnDTO
      {
        Id = user.Id,
        Email = user.Email,
        Name = user.Name,
        Token = _tokenService.CreateToken(user),
        IsSearchable = user.IsSearchable
      };
    }

    [HttpPatch]
    public async Task<ActionResult<UserReturnDTO>> UpdateUser(RegisterOrUpdateInputDTO updateDTO)
    {
      //get user
      var user = await GetUserFromClaimsPrincipal(HttpContext.User);

      //check password
      var isPasswordCorrect = _passwordService.CheckPassword(updateDTO.Password, user.Password);
      if (!isPasswordCorrect)
      {
        return Unauthorized(new ApiError(401, "Incorrect password."));
      }

      //update fields - note that you cannot use mapper or it will set password
      user.Name = updateDTO.Name;
      user.Email = updateDTO.Email;
      user.IsSearchable = updateDTO.IsSearchable;

      //update user
      var updatedUser = await _userService.UpdateAsync(user);

      return new UserReturnDTO
      {
        Id = updatedUser.Id,
        Email = updatedUser.Email,
        Name = updatedUser.Name,
        Token = _tokenService.CreateToken(user),
        IsSearchable = updatedUser.IsSearchable
      };
    }

    [HttpPatch("changepassword")]
    public async Task<ActionResult> ChangeUserPassword(ChangePasswordInputDTO passwords)
    {
      //get user
      var user = await GetUserFromClaimsPrincipal(HttpContext.User);

      //verify old password
      var isPasswordCorrect = _passwordService.CheckPassword(passwords.OldPassword, user.Password);
      if (!isPasswordCorrect)
      {
        return Unauthorized(new ApiError(401, "Incorrect password."));
      }

      //encrypt new password
      user.Password = _passwordService.HashPassword(passwords.NewPassword);

      //update user
      var updatedUser = await _userService.UpdateAsync(user);

      return NoContent();
    }

    //using post because haveing issues sending body with axios
    [HttpPost("delete")]
    public async Task<ActionResult> DeleteUser(PasswordInputDTO password)
    {
      //get user
      var user = await GetUserFromClaimsPrincipal(HttpContext.User);

      //verify password
      var isPasswordCorrect = _passwordService.CheckPassword(password.Password, user.Password);
      if (!isPasswordCorrect)
      {
        return Unauthorized(new ApiError(401, "Incorrect password."));
      }

      //delete user
      var isDeleted = await _userService.DeleteAsync(user);
      if (!isDeleted)
      {
        return BadRequest(new ApiError(400, "Error deleting user."));
      }

      return NoContent();
    }

    private async Task<User> GetUserFromClaimsPrincipal(ClaimsPrincipal user)
    {
      var id = GetUserIdFromClaims();
      return await _userService.GetByIdAsync(id);
    }
  }
}
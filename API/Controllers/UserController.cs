using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs.UserDTOs;
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
    //   GET     /searchable         get searchable users
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

    //CREATE
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<UserReturnDTO>> Register(RegisterDTO registerDTO)
    {
      //Note: bad password checked by attributes on RegisterDTO

      //check if email exists
      var spec = new UserWithEmailSpec(registerDTO.Email);
      var user = await _userService.GetEntityWithSpecAsync(spec);
      if (user != null)
      {
        return BadRequest(new ApiError(400, "An account already exists for this email."));
      }

      //encrypt password
      var hashedPassword = _passwordService.HashPassword(registerDTO.Password);

      //create new user - TODO - make user constructor instead?
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
        Token = _tokenService.CreateToken(user)
      };
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserReturnDTO>> Login(LoginDTO loginDTO)
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
        Token = _tokenService.CreateToken(user)
      };
    }

    //READ

    [Authorize(Policy = "IsActiveUser")]
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
        Token = _tokenService.CreateToken(user)
      };
    }

    [HttpGet("searchable")]
    public async Task<ActionResult<IReadOnlyList<UserReturnDTO>>> GetSearchableUsers()
    {
      var spec = new SearchableUserSpec();
      var searchableUsers = await _userService.GetListWithSpecAsync(spec);
      return Ok(_mapper.Map<IReadOnlyList<User>, IReadOnlyList<UserReturnDTO>>(searchableUsers));
    }

    //UPDATE

    [HttpPatch]
    public async Task<ActionResult<UserReturnDTO>> UpdateUser(UpdateUserDTO updateDTO)
    {
      //get user
      var user = await GetUserFromClaimsPrincipal(HttpContext.User);

      //update user
      _mapper.Map<UpdateUserDTO, User>(updateDTO, user);
      var updatedUser = await _userService.UpdateAsync(user);

      return new UserReturnDTO
      {
        Id = user.Id,
        Email = updatedUser.Email,
        Name = updatedUser.Name,
        Token = _tokenService.CreateToken(user)
      };
    }

    [HttpPatch("changepassword")]
    public async Task<ActionResult> ChangeUserPassword(ChangePasswordDTO passwords)
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

    //DELETE

    [HttpDelete]
    public async Task<ActionResult> DeleteUser([FromBody] PasswordDTO password)
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
      await _userService.DeleteAsync(user);

      return NoContent();
    }

    private async Task<User> GetUserFromClaimsPrincipal(ClaimsPrincipal user)
    {
      var email = GetEmailFromClaims();
      //get user by email
      var spec = new UserWithEmailSpec(email);
      return await _userService.GetEntityWithSpecAsync(spec);
    }
  }
}
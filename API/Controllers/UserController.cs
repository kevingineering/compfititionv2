using System.Threading.Tasks;
using Infrastructure.Models.Request;
using Infrastructure.Models.Response;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Infrastructure.Signatures;

namespace API.Controllers
{
  public class UserController : ParentController
  {
    private readonly IUserService _userService;
    private readonly ITokenUtility _tokenUtility;

    public UserController(IUserService userService, ITokenUtility tokenUtility)
    {
      _userService = userService;
      _tokenUtility = tokenUtility;
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<UserResponse>> RegisterUser(RegisterRequest request)
    {
      return Ok(await _userService.Register(request));
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserResponse>> LoginUser(LoginRequest request)
    {
      return Ok(await _userService.Login(request));
    }

    [HttpGet]
    public async Task<ActionResult<UserResponse>> GetUser()
    {
      return Ok(await _userService.GetUser(UserId));
    }

    [HttpPatch]
    public async Task<ActionResult<UserResponse>> UpdateUser(UpdateRequest request)
    {
      return Ok(await _userService.UpdateUser(UserId, request));
    }

    [HttpPatch("changepassword")]
    public async Task<ActionResult> ChangePassword(ChangePasswordRequest request)
    {
      await _userService.ChangePassword(UserId, request);
      return NoContent();
    }

    //using post because having issues sending body with axios
    [HttpPost("delete")]
    public async Task<ActionResult> DeleteUser(PasswordRequest request)
    {
      await _userService.DeleteUser(UserId, request);
      return NoContent();
    }
  }
}
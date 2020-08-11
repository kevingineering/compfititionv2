using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class UserController : BaseController
  {
    private readonly IGenericRepository<User> _userRepo;

    public UserController(IGenericRepository<User> userRepo)
    {
      _userRepo = userRepo;
    }

    //CREATE

    [HttpPost]
    public IActionResult RegisterUser()
    {
      throw new NotImplementedException();
    }

    [HttpPost]
    public IActionResult LoginUser()
    {
      throw new NotImplementedException();
    }

    //READ

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<User>>> GetUsers()
    {
      var goals = await _userRepo.ListAllAsync();
      return Ok(goals);
    }

    [HttpGet]
    public IActionResult GetUser()
    {
      throw new NotImplementedException();
    }

    [HttpGet]
    public IActionResult GetSearchableUsers()
    {
      throw new NotImplementedException();
    }

    //UPDATE

    [HttpPatch]
    public IActionResult UpdateUser()
    {
      throw new NotImplementedException();
    }

    [HttpPatch]
    public IActionResult ChangeUserPassword()
    {
      throw new NotImplementedException();
    }

    //DELETE

    [HttpDelete]
    public IActionResult DeleteUser()
    {
      throw new NotImplementedException();
    }
  }
}
using System.Collections.Generic;
using System.Text;
using Core.Entities;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System;

// https://www.c-sharpcorner.com/article/jwt-json-web-token-authentication-in-asp-net-core/#:~:text=JWT%20in%20ASP.NET%20Core&text=in%20web%20development.-,It%20is%20an%20open%20standard%20which%20allows%20transmitting%20data%20between,be%20easily%20verified%20and%20trusted.
namespace Infrastructure.Services
{
  public class TokenService : ITokenService
  {
    private readonly IConfiguration _config;
    private readonly SymmetricSecurityKey _key;

    public TokenService(IConfiguration config)
    {
      _config = config;
      _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token:Key"]));
    }

    public string CreateToken(User user)
    {
      var claims = new List<Claim>
      {
        new Claim(JwtRegisteredClaimNames.Email, user.Email),
        new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString())
      };

      var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.UtcNow.AddDays(7),
        SigningCredentials = creds,
        Issuer = _config["Token:Issuer"]
      };

      var tokenHandler = new JwtSecurityTokenHandler();

      var token = tokenHandler.CreateToken(tokenDescriptor);

      return tokenHandler.WriteToken(token);
    }
  }
}
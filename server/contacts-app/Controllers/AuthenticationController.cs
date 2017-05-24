using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using contacts_app.Config;
using contacts_app.Models;
using contacts_app.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace contacts_app.Controllers
{
    [Route("api/authentication")]
    [EnableCors("MyPolicy")]
    public class AuthenticationController : Controller
    {
        private readonly IUserService _userService;

        public AuthenticationController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public IActionResult Login([FromBody]AuthRequest loginData)
        {
            var user = _userService.GetByUserNameAndPassword(loginData.UserName, loginData.Password);
            if (user != null)
            {
                var token = GenerateToken(user);
                return new JsonResult(new
                {
                    userId = user.Id.ToString(),
                    token
                });
            }
            return Unauthorized();
        }

        private string GenerateToken(User user)
        {
            var handler = new JwtSecurityTokenHandler();
            var expires = DateTime.Now + TokenAuthOption.ExpiresSpan;

            ClaimsIdentity identity = new ClaimsIdentity(
                new GenericIdentity(user.UserName, "TokenAuth"),
                new[] { new Claim("ID", user.Id.ToString()) }
            );

            var securityToken = handler.CreateToken(new SecurityTokenDescriptor
            {
                Issuer = TokenAuthOption.Issuer,
                Audience = TokenAuthOption.Audience,
                SigningCredentials = TokenAuthOption.SigningCredentials,
                Subject = identity,
                Expires = expires
            });

            return handler.WriteToken(securityToken);
        }
    }
}

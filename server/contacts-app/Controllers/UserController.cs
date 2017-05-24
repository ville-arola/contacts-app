using contacts_app.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace contacts_app.Controllers
{
    [Route("api/user")]
    [Authorize("Bearer")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPut]
        public IActionResult Login()
        {
            var user = _userService.GetByUserName(User.Identity.Name);
            if (user != null)
            {
                return new JsonResult(new
                {
                    user.UserName,
                    user.Email,
                    user.FirstName,
                    user.LastName
                });
            }
            return null;
        }
    }
}

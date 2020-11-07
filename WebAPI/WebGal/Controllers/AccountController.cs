using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using WebGal.Models;
using WebGal.ViewModels;

namespace WebGal.Controllers
{

    public class AccountController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
            => (_userManager, _signInManager) = (userManager, signInManager);

        [Route("AccountGet/{id?}")]
        [HttpGet]
        public async Task<IdentityUser> Register(string id)
            => _userManager.Users.Where(u => u.Id == id).FirstOrDefault();

        [Route("AccountPost")]
        [HttpPost]
        public async Task<string> Register([FromBody] RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                IdentityUser user = new IdentityUser
                {
                    UserName = model.Username,
                    Email = model.Email
                };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    await _signInManager.SignInAsync(user, false);
                    return "Posted successfully";
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                    }
                }
            }
            var errors = ModelState.Values.SelectMany(v => v.Errors);
            return "Posted unsuccessfully!";

        }

        [Route("AccountLoginGet")]
        [HttpGet]
        public LoginViewModel Login(string returnUrl = null)
            => new LoginViewModel { ReturnUrl = returnUrl };

        [Route("AccountLoginPost")]
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<string> Login([FromBody] LoginViewModel model)
        {
            if (ModelState.Values.Count() > 0)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors);
            }
            else
            if (ModelState.IsValid)
            {
                var result
                    = await _signInManager.PasswordSignInAsync(model.Username, model.Password, model.RememberMe, false);
                if (result.Succeeded)
                {
                    if (!string.IsNullOrEmpty(model.ReturnUrl) && Url.IsLocalUrl(model.ReturnUrl))
                    {
                        return "Login: " + model.ReturnUrl; // Redirect returnUrl
                    }
                    else
                    {
                        return "Login: " + "no ReturnUrl"; // Redirect home index
                    }
                }
                else
                {
                    ModelState.AddModelError("", "Wrong login and (or) password");
                }
            }
            return "Login: " + "ModelState is not valid";
        }

        [Route("AccountLogout")]
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<string> Logout()
        {
            await _signInManager.SignOutAsync();
            return "Logout";
        }
    }
}

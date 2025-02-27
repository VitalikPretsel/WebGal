﻿using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebGal.Models;
using WebGal.ViewModels;

namespace WebGal.Controllers
{
    [Route("[controller]")]
    [EnableCors("_myAllowSpecificOrigins")]
    public class AccountController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, ApplicationContext context)
            => (_userManager, _signInManager) = (userManager, signInManager);
       
        [Route("User/Get/{username}")]        //{username}
        [HttpGet]
        public async Task<IdentityUser> GetAccount(string username) =>
            _userManager.Users.FirstOrDefault(u => (u.UserName == username || u.Id == username));

        [Route("Register/Post")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityUser user = new IdentityUser
            {
                UserName = model.Username,
                Email = model.Email
            };
            if (_userManager.Users.Any(u => u.Email == model.Email))            
            {
                ModelState.AddModelError("Email", "User with such email already exists");
                return BadRequest(ModelState);
            }
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("Password", error.Description);
                }
                return BadRequest(ModelState);
            }
            await _signInManager.SignInAsync(user, false);
            
            return Ok();
        }

        [Route("Login/Get")]
        [HttpGet]
        public LoginViewModel Login(string returnUrl = null)
            => new LoginViewModel { ReturnUrl = returnUrl };

        [Route("Login/Post")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result
                = await _signInManager.PasswordSignInAsync(model.Username, model.Password, model.RememberMe, false);

            if (!result.Succeeded)
            {
                ModelState.AddModelError("", "Wrong login and (or) password");
                return BadRequest(ModelState);
            }

            var claims = new List<Claim>
            {
                new Claim("Id", _userManager.Users.Where(u => u.UserName == model.Username).FirstOrDefault().Id), 
                new Claim("Name", model.Username), 
                new Claim(ClaimTypes.Role, "user")
            };

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("SuperSecretKey123"));
            var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken(
                issuer: "https://localhost:5001",
                audience: "https://localhost:4200",
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: signingCredentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return Ok(new { Token = tokenString });
        }
    }
}

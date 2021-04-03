using System.ComponentModel.DataAnnotations;

namespace WebGal.ViewModels
{
    public class LoginViewModel
    {
        [Required]
        [Display(Name = "Username")]
        public string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }
        
        [Display(Name = "Remember?")]
        public bool RememberMe { get; set; }

        public string ReturnUrl { get; set; }
    }
}

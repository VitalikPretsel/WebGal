using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebGal.Models
{
    public class Profile
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string UserID { get; set; }
        public string ProfileName { get; set; }
        public string ProfileInfo { get; set; }
        public string ProfilePicturePath { get; set; }
    }
}

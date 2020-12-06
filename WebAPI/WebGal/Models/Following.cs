using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebGal.Models
{
    public class Following
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string FollowerUserId { get; set; }
        [Required]
        public string FollowingUserId { get; set; }
    }
}

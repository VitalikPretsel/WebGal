using System.ComponentModel.DataAnnotations;

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

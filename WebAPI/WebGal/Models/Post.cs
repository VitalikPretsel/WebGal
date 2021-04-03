using System;
using System.ComponentModel.DataAnnotations;

namespace WebGal.Models
{
    public class Post
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string UserID { get; set; }
        public string PostText { get; set; }
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/mm/yyyy}")]
        public DateTime PostDate { get; set; }
        public string PicturePath { get; set; }
    }
}

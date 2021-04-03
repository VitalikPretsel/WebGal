using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace WebGal.Models
{
    public class ApplicationContext: IdentityDbContext<IdentityUser>
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }

        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Following> Followings { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}

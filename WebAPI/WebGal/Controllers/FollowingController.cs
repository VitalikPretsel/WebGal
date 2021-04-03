using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebGal.Models;

namespace WebGal.Controllers
{
    [Route("[controller]")]
    [EnableCors("_myAllowSpecificOrigins")]
    public class FollowingController : Controller
    {
        private readonly ApplicationContext _appContext;
        public FollowingController(ApplicationContext appContext) => _appContext = appContext;

        [HttpPost]
        [Route("Follow")]
        public IActionResult AddFollowing([FromBody] Following model) // [FromBody] 
        {
            _appContext.Followings.Add(new Following
            {
                FollowerUserId = model.FollowerUserId,
                FollowingUserId = model.FollowingUserId,
            });
            _appContext.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("GetFollowings/{userid}")]
        public IEnumerable<Following> GetFollowings(string userid)
            => _appContext.Followings.Where(f => f.FollowerUserId == userid).ToList();
        [HttpGet]
        [Route("GetFollowers/{userid}")]
        public IEnumerable<Following> GetFollowers(string userid)
            => _appContext.Followings.Where(f => f.FollowingUserId == userid).ToList();

        [HttpGet]
        [Route("IsFollowing/{followerId}/{followingId}")]
        public bool IsFollowing(string followerId, string followingId)
            => _appContext.Followings.Any(f => (f.FollowerUserId == followerId && f.FollowingUserId == followingId));

        [HttpDelete]
        [Route("Unfollow/{followerId}/{followingId}")]
        public async Task<IActionResult> DeleteFollowing(string followerId, string followingId)
        {
            var following = _appContext.Followings.FirstOrDefault(f => (f.FollowerUserId == followerId && f.FollowingUserId == followingId));
            if (following != null)
            {
                _appContext.Followings.Remove(following);
                _appContext.SaveChanges();
            }
            return Ok();
        }
    }
}

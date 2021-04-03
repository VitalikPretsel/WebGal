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
    public class PostController : Controller
    {
        private readonly ApplicationContext _appContext;
        public PostController(ApplicationContext appContext) => _appContext = appContext;

        [HttpPost]
        [Route("Add")]
        public IActionResult AddPost([FromBody] Post model) // [FromBody] 
        {
            _appContext.Posts.Add(new Post
            {
                UserID = model.UserID,
                PostText = model.PostText,
                PostDate = model.PostDate,
                PicturePath = model.PicturePath
            });
            _appContext.SaveChanges();
            return Ok();
        }

        [HttpPut]
        [Route("Edit/{id}")]
        public async Task<IActionResult> EditPost(int id, [FromBody] Post model)
        {
            var post = _appContext.Posts.FirstOrDefault(p => p.Id == id);

            if (post != null)
            {
                post.PostText = model.PostText;
                post.PostDate = model.PostDate;
                post.PicturePath = model.PicturePath;
                _appContext.SaveChanges();
            }
            return Ok();
        }

        [HttpGet]
        [Route("GetPosts/{userid}")]
        public IEnumerable<Post> GetPosts(string userid)
            => _appContext.Posts.Where(p => p.UserID == userid).ToList().OrderByDescending(p => p.Id);
        [HttpGet]
        [Route("GetPost/{postid}")]
        public Post GetPost(int postid)
            => _appContext.Posts.Where(p => p.Id == postid).FirstOrDefault();

        [HttpDelete]
        [Route("Delete/{postid}")]
        public async Task<IActionResult> Delete(int postid)
        {
            var post = _appContext.Posts.FirstOrDefault(p => p.Id == postid);
            if (post != null)
            {
                _appContext.Posts.Remove(post);
                _appContext.SaveChanges();
            }
            return Ok();
        }
    }
}

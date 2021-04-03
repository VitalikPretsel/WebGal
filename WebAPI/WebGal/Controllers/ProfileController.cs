using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using WebGal.Models;

namespace WebGal.Controllers
{
    [Route("[controller]")]
    [EnableCors("_myAllowSpecificOrigins")]
    public class ProfileController : Controller
    {
        private readonly ApplicationContext _appContext;
        public ProfileController(ApplicationContext appContext) => _appContext = appContext;


        [HttpPost]
        [Route("Add")]
        public IActionResult AddProfile([FromBody] Profile model) // [FromBody] 
        {
            _appContext.Profiles.Add(new Profile
            {
                UserID = model.UserID,
                ProfileName = model.ProfileName,
                ProfileInfo = model.ProfilePicturePath,
                ProfilePicturePath = model.ProfilePicturePath
            });
            _appContext.SaveChanges();
            return Ok();
        }

        [HttpPut]
        [Route("Edit/{id}")]
        public async Task<IActionResult> EditProfile(string id, [FromBody] Profile model)
        {
            var profile = _appContext.Profiles.FirstOrDefault(p => p.UserID == id);

            if (profile != null)
            {
                profile.ProfileName = model.ProfileName;
                profile.ProfileInfo = model.ProfileInfo;
                profile.ProfilePicturePath = model.ProfilePicturePath;
            }
            _appContext.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("Get/{id}")]
        public async Task<Profile> GetProfile(string id)
            => _appContext.Profiles.Where(p => p.UserID == id).FirstOrDefault();
    }
}

using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Net.Http.Headers;
using WebGal.Models;

namespace WebGal.Controllers
{
    [Route("[controller]")]
    [EnableCors("_myAllowSpecificOrigins")]
    public class UploadController : Controller
    {
        private readonly ApplicationContext _appContext;
        public UploadController(ApplicationContext appContext) => _appContext = appContext;

        [HttpPost]
        [DisableRequestSizeLimit]
        public IActionResult Upload()
        {
            try 
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpDelete]
        [Route("Delete/{picturepath}")]
        public IActionResult Delete(string picturepath)
        {
            try
            {
                var folderName = Path.Combine("Resources", "Images");
                var pathToDelete = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                pathToDelete = Path.Combine(pathToDelete, picturepath);
                
                System.IO.File.Delete(pathToDelete);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}

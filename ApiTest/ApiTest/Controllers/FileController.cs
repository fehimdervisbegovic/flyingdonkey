using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ApiTest.Dto;
using ApiTest.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        readonly IFileService _fileService;
        
        public FileController(IFileService fileService)
        {
            _fileService = fileService;
        }
        
        /// <summary>
        /// Save file to FileSystem. If exists then file will be replaced
        /// </summary>
        /// <param name="metaData"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] MetaData metaData)
        {
            try
            {
                // validate input data using model state
                // this could be handled  much better ...
                if (!ModelState.IsValid)
                {
                    throw new Exception( 
                        string.Join(", ", ModelState.SelectMany(s => s.Value.Errors).Select(s => s.ErrorMessage)));
                }

                // save only first file. of course we could add some logic for multiple files per request
                var f = Request.Form.Files.FirstOrDefault();

                // save only first 
                if (f != null)
                {
                    await _fileService.StoreFile(f);

                    metaData.FileName = Path.GetFileName(f.FileName);
                    metaData.FileSize = $"{f.Length} bytes";
                    metaData.UploadDate = DateTime.UtcNow;
                }
                else
                    throw new Exception("Please provide file content");

                return Ok(metaData);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

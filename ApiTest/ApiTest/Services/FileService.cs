using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ApiTest.Services
{
    public class FileService: IFileService
    {
        readonly string _storeLocation;

        readonly string[] _whitelistedFileExtensions;

        public FileService(IConfiguration config)
        {
            var allowedExtensions = config["AllowedFileExtensions"];
            _storeLocation = config["StoreLocation"];
            // e.g. document files
            _whitelistedFileExtensions = allowedExtensions.Split(";"); // new[] { ".pdf", ".docx", ".xlsx" };
        }

        public bool IsAllowedExtension(string fileName)
        {
            var fileExtension = Path.GetExtension(fileName);

            return _whitelistedFileExtensions
                .Any(a => a.Equals(fileExtension, StringComparison.CurrentCultureIgnoreCase));
        }

        public async Task StoreFile(IFormFile file)
        {
            // check allowed file extensions
            if (!IsAllowedExtension(file.FileName))
                throw new Exception($"Invalid file type. File has not been stored");

            // read FileStream and store it somewhere ...
            using (var fileStream = file.OpenReadStream())
            {
                var filePath = Path.Join(_storeLocation, file.FileName);

                // uncomment this if you like to store files into your file system 
                /*
                using (var fs = new FileStream(filePath, FileMode.Create))
                {
                    fileStream.Seek(0, SeekOrigin.Begin);
                    await fileStream.CopyToAsync(fs);
                    await fs.FlushAsync();
                    fs.Close();
                }
                */
            }
        }
    }
}

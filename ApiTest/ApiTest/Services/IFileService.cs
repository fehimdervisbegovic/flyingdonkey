using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ApiTest.Services
{
    public interface IFileService
    {
        bool IsAllowedExtension(string fileName);

        Task StoreFile(IFormFile file);
    }
}

using System;
using ApiTest.Services;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;

namespace ApiTest.XUnitTests
{
    public class FileServiceTest
    {
        public readonly IFileService fileService;

        public Mock<IConfiguration> configuration = new Mock<IConfiguration>();


        public FileServiceTest()
        {
            /*
             "StoreLocation":  "c:\\tmp",
            "AllowedFileExtensions": ".pdf;.docx;.txt",
            */
            configuration.Setup(s => s["AllowedFileExtensions"])
                .Returns(".pdf;.docx;.txt");
            
            configuration.Setup(s => s["StoreLocation"])
                .Returns("c:\\tmp");

            fileService = new FileService(configuration.Object);
        }

        [Fact]
        public void Test1()
        {
            Assert.False(fileService.IsAllowedExtension("superfile.dxs"));
        }

        [Fact]
        public void Test2()
        {
            Assert.True(fileService.IsAllowedExtension("superfile.pdf"));
        }
    }
}

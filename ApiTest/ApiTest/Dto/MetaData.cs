using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiTest.Dto
{
    public class MetaData
    {
        [Required(AllowEmptyStrings =false, ErrorMessage ="File name is required")]
        [MinLength(5, ErrorMessage = "File name must be at last 5 characters long")]
        public string FileName { get; set; }

        public string FileExtension { get; set; }

        [Required(ErrorMessage ="User ID is required")]
        public string UserUploaded { get; set; }

        public string FileSize { get; set; }

        public DateTime? UploadDate { get; set; }
    }
}

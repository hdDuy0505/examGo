using System;
using System.ComponentModel.DataAnnotations;

namespace back_end.Models
{
    public class Subject
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(45, ErrorMessage = "Name length must be between 1 and 45.", MinimumLength = 1)]
        public string Name { get; set; }

        //[Required]
        //[Range(1, 12, ErrorMessage = "Grade must be between 1 and 12.")]
        //public int Grade { get; set; }
    }
}

using back_end.Data;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace back_end.Models
{
    public class ExamCreate
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public Exam Exam { get; set; }
        [Required]
        public List<Question> Questions { get; set; }
    }
}

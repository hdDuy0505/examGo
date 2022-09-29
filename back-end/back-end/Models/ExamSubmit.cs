using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace back_end.Models
{
    public class ExamSubmit
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public StudentExam StudentExam { get; set; }
        [Required]
        public List<StudentExamChoice> StudentChoiceList { get; set; }
    }
}

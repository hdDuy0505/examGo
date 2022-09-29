using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace back_end.Models
{
    public class Question
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(200, ErrorMessage = "Content length must be between 1 and 200.", MinimumLength = 1)]
        public string Content { get; set; }

        
        public int CorrectAnswerId { get; set; }
        //[Required]
        //public int CorrectAnswer { get; set; }

        [Required]
        public int ExamId { get; set; }
        public List<Answer> AnswerList { get; set; }
        //[ForeignKey("ExamId")]
        //public virtual Exam Exam { get; set; }
    }
}

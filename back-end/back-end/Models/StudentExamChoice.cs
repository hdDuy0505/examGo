using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_end.Models
{
    public class StudentExamChoice
    {
        [Key]
        [Column(Order=0)]
        public int StudentId { get; set; }
        [Key]
        [Column(Order = 1)]
        public int ExamId { get; set; }
        [Key]
        [Column(Order = 2)]
        public int QuestionId { get; set; }
        [Required]
        public int ChosenAnswerId { get; set; }

        //[ForeignKey("StudentId")]
        //public virtual User User { get; set; }
        //[ForeignKey("ExamId")]
        //public virtual Exam Exam { get; set; }
    }
}

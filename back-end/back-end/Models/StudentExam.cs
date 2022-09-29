using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_end.Models
{
    public class StudentExam
    {
        [Key] 
        [Column(Order = 0)]
        public int StudentId { get; set; }
        [Key]
        [Column(Order = 1)]
        public int ExamId { get; set; }
        [Required]
        public double Point { get; set; }
        [Required]
        public DateTime SubmitTime { get; set; }
        [Required]
        public int Duration { get; set; }
    }
}

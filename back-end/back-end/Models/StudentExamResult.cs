using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace back_end.Models
{
    public class StudentExamResult
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int MaxDuration { get; set; }
        [Required]
        public int Duration { get; set; }
        [Required]
        public DateTime? StartTime { get; set; } = null!;
        [Required]
        public double Point { get; set; }
        [Required]
        public string Teacher { get; set; }
        [Required]
        public string Subject { get; set; }

        public List<QuestionResult> QuestionResultList { get; set; }
        //CorrectAnswers
    }
}

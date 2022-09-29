using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace back_end.Models
{
    public class QuestionResult
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(200, ErrorMessage = "Content length must be between 1 and 200.", MinimumLength = 1)]
        public string Content { get; set; }

        [Required]
        public int CorrectAnswerId { get; set; }
        [Required]
        public int ChosenAnswerId { get; set; }

        public List<Answer> AnswerList { get; set; }
    }
}

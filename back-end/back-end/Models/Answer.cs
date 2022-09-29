using System.ComponentModel.DataAnnotations;

namespace back_end.Models
{
    public class Answer
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(200, ErrorMessage = "Content length must be between 1 and 200.", MinimumLength = 1)]
        public string Content { get; set; }

        [Required]
        public int QuestionId { get; set; }
    }
}

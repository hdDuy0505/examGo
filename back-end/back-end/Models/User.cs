using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_end.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        public string? Phone { get; set; } = null!;
        public DateTime? DateOfBirth { get; set; } = DateTime.MinValue!;
        public string? CitizenId { get; set; } = null!;
        public string? Address { get; set; } = null!;
        [Required]
        public int UserTypeId { get; set; }
        public int IsDeleted { get; set; }

        //public virtual Account Account { get; set; }
        //public virtual string Token { get; set; }
    }

    public class UserLogin : User
    {
        public string Token { get; set; }
    }
}

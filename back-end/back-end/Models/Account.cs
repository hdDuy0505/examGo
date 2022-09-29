using back_end.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_end.Data
{
    public class Account
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        public string Username { get; set; }
        //[Required]
        //public string Password { get; set; }
        [Required]
        public Byte[] PasswordHash { get; set; }
        [Required]
        public Byte[] PasswordSalt { get; set; }

        //[ForeignKey("UserId")]
        //public virtual User? User { get; set; } = null!;
    }
}

using System;

namespace back_end.Models
{
    public class AccountDto
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
        public Byte[] PasswordHash { get; set; }
        public Byte[] PasswordSalt { get; set; }

        public virtual User? User { get; set; } = null!;
    }
}

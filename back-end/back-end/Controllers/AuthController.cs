using back_end.Data;
using back_end.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAllOrigins")]
    public class AuthController : ControllerBase
    {
        private readonly MyDbContext _context;
        //public static Account account = new Account();
        //public static AccountDto accountDto = new AccountDto();

        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration, MyDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<Account>> Register(AccountDto request)
        {
            if (AccountExists(request.Username))
            {
                return StatusCode(409, $"Account '{request.Username}' already exists.");
            }

            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            //accountDto.Username = request.Username;
            request.PasswordHash = passwordHash;
            request.PasswordSalt = passwordSalt;


            _context.User.Add(request.User);
            await _context.SaveChangesAsync();

            Account newAccount = new Account
            {
                UserId = request.User.Id,
                Username = request.Username,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            _context.Account.Add(newAccount);
            await _context.SaveChangesAsync();

            return Ok(request);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserLogin>> Login(AccountDto request)
        {
            if (!AccountExists(request.Username))
            {
                return BadRequest("Account not found.");
            }

            var account = await _context.Account.FirstOrDefaultAsync(a => a.Username == request.Username);
            

            if (!VerifyPasswordHash(request.Password, account.PasswordHash, account.PasswordSalt))
            {
                return BadRequest("Wrong username or password.");
            }

            var user = await _context.User.FindAsync(account.UserId);
            if (user.IsDeleted == 1)
            {
                return StatusCode(403, $"Account '{request.Username}' was blocked.");
            }
            string token = CreateToken(account);

            return Ok(new UserLogin
            {
                Name = user.Name,
                UserTypeId = user.UserTypeId,
                Email = user.Email,
                Phone = user.Phone,
                Address = user.Address,
                Token = token,
            });}

        [Authorize]
        [HttpPut("changePassword")]
        public async Task<ActionResult<string>> ChangePassword(AccountDto request)
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(accessToken);

            int userId = Int32.Parse(jwtSecurityToken.Claims.First(claim => claim.Type == "nameid").Value);

            var account = await _context.Account.FindAsync(userId);

            if (!VerifyPasswordHash(request.Password, account.PasswordHash, account.PasswordSalt))
            {
                return BadRequest("Wrong password.");
            }
            
            CreatePasswordHash(request.NewPassword, out byte[] passwordHash, out byte[] passwordSalt);

            var newAccount = _context.Account.FirstOrDefault(e => e.UserId == userId);

            if (newAccount != null)
            {
                newAccount.PasswordHash = passwordHash;
                newAccount.PasswordSalt = passwordSalt;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(account.Username))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("Successfully change password");
        }

        private string CreateToken(Account accountDto)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, accountDto.UserId.ToString())
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        private bool AccountExists(string username)
        {
            return _context.Account.Any(e => e.Username == username);
        }
    }
}

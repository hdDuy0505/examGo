using back_end.Data;
using back_end.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly MyDbContext _context;
        public static int PAGE_SIZE { get; set; } = 5;

        public UserController(MyDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult<User>> GetUser()
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(accessToken);

            int userId = Int32.Parse(jwtSecurityToken.Claims.First(claim => claim.Type == "nameid").Value);
            var user = await _context.User.FirstOrDefaultAsync(s => s.Id == userId);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> PutUser(User user)
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(accessToken);

            int userId = Int32.Parse(jwtSecurityToken.Claims.First(claim => claim.Type == "nameid").Value);

            // if (userId != user.Id)
            // {
            //    return BadRequest();
            // }

            // _context.Entry(user).State = EntityState.Modified;
            var newUser = _context.User.FirstOrDefault(e => e.Id == userId);

            if (newUser != null)
            {
                newUser.Name = user.Name;
                newUser.Email = user.Email;
                newUser.Phone = user.Phone;
                newUser.DateOfBirth = user.DateOfBirth;
                newUser.CitizenId = user.CitizenId;
                newUser.Address = user.Address;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(userId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("Successfully change your information");
        }

        // POST: api/Account
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Account/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.Id == id);
        }

        [Authorize]
        [HttpGet("takenExamList")]
        public async Task<ActionResult<IEnumerable<ExamResult>>> GetTakenExamList(int subject, string sort, int page = 1)
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(accessToken);

            int studentId = Int32.Parse(jwtSecurityToken.Claims.First(claim => claim.Type == "nameid").Value);

            var examList = await _context.Exam.AsQueryable().ToListAsync();

            //examList = examList.Where(e => e.IsDeleted == 0).ToList();

            if (subject > 0)
            {
                examList = examList.Where(e => e.SubjectId == subject).ToList();
            }

            var examResultList = examList.Select(e => new ExamResult
            {
                Id = e.Id,
                Name = e.Name,
                MaxDuration = e.MaxDuration,
                CreatedTime = e.CreatedTime,
                TeacherId = e.TeacherId,
                SubjectId = e.SubjectId,
                IsDeleted = e.IsDeleted,
                IsDone = e.IsDone,
                NumOfQuestions = e.NumOfQuestions,
                StudentExam = null,
                //Teacher = e.Teacher,
            }).ToList();


            foreach (var examResult in examResultList)
            {
                var teacher = await _context.User.FindAsync(examResult.TeacherId);
                examResult.Teacher = teacher;

                var studentExam = await _context.Student_Exam.FindAsync(studentId, examResult.Id);
                examResult.IsDone = (studentExam == null ? 0 : 1);
                examResult.StudentExam = studentExam;
            }
            examResultList = examResultList.Where(e => e.IsDone == 1).ToList();

            if (sort == "point")
            {
                examResultList = examResultList.OrderByDescending(e => e.StudentExam.Point).ThenBy(e => e.StudentExam.Duration).ToList();
            }
            else if (sort == "duration")
            {
                examResultList = examResultList.OrderBy(e => e.StudentExam.Duration).ThenBy(e => e.StudentExam.Point).ToList();
            }

            // Pagination
            if (page > 0)
            {
                examResultList = examResultList.Skip((page - 1) * PAGE_SIZE).Take(PAGE_SIZE).ToList();
            }

            return examResultList;
        }

        [Authorize]
        [HttpGet("studentRecord")]
        public async Task<ActionResult<StudentRecord>> GetStudentRecord()
        {
            var takenExamList = await GetTakenExamList(0, "", 0);
            int count = takenExamList.Value.Count();

            if (count == 0)
            {
                return new StudentRecord { NumberOfTakenExams = 0, AveragePoint = 0, AverageDuration = 0 };
            }

            double averagePoint = takenExamList.Value.Sum(e => e.StudentExam.Point) / count;
            int averageDuration = (int)(Math.Ceiling(takenExamList.Value.Sum(e => (double)(e.StudentExam.Duration)) / count));

            return new StudentRecord
            {
                NumberOfTakenExams = count,
                AveragePoint = averagePoint,
                AverageDuration = averageDuration,
            };
        }
    }
}

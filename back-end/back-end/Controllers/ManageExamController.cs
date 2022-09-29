using back_end.Data;
using back_end.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
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
    [EnableCors("AllowAllOrigins")]
    public class ManageExamController : ControllerBase
    {
        private readonly MyDbContext _context;

        public static int PAGE_SIZE { get; set; } = 5;

        public ManageExamController(MyDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Exam>>> GetRetrieveExam(string search, int page = 1)
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(accessToken);

            int teacherId = Int32.Parse(jwtSecurityToken.Claims.First(claim => claim.Type == "nameid").Value);
            var teacher = await _context.User.FindAsync(teacherId);
            if (teacher.UserTypeId != 2)
            {
                return StatusCode(403, $"User '{teacher.Name}' is not a teacher.");
            }

            var examList = await _context.Exam.AsQueryable().ToListAsync();

            if (!string.IsNullOrEmpty(search))
            {
                examList = examList.Where(e => e.Name.ToLower().Contains(search.ToLower())).ToList();
            }

            examList = examList.Where(e => e.TeacherId == teacherId && e.IsDeleted == 0).ToList();

            examList = examList.Skip((page - 1) * PAGE_SIZE).Take(PAGE_SIZE).ToList();

            return examList.Select(e => new Exam
            {
                Id = e.Id,
                Name = e.Name,
                MaxDuration = e.MaxDuration,
                CreatedTime = e.CreatedTime,
                TeacherId = e.TeacherId,
                SubjectId = e.SubjectId,
                IsTaken = e.IsTaken,
                NumOfQuestions = e.NumOfQuestions,
            }).ToList();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Exam>> GetExam(int id)
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(accessToken);

            int teacherId = Int32.Parse(jwtSecurityToken.Claims.First(claim => claim.Type == "nameid").Value);
            var teacher = await _context.User.FindAsync(teacherId);
            if (teacher.UserTypeId != 2)
            {
                return StatusCode(403, $"User '{teacher.Name}' is not a teacher.");
            }

            List<Question> questionList = (
            from e in _context.Exam
            join q in _context.Question on e.Id equals q.ExamId
            where e.Id == id
            select q
            ).ToList();

            foreach (var question in questionList)
            {
                List<Answer> answers = (
                from a in _context.Answer
                join q in _context.Question on a.QuestionId equals q.Id
                where q.Id == question.Id
                select a
                ).ToList();
                question.AnswerList = answers;
            }
            var exam = await _context.Exam.FindAsync(id);

            //var exam = await _context.Exam.Select(e => new Exam {
            //    Id = e.Id,
            //    Name = e.Name,
            //    MaxDuration = e.MaxDuration,
            //    CreatedTime = e.CreatedTime,
            //    TeacherId = e.TeacherId,
            //    SubjectId = e.SubjectId,
            //}).FindAsync(id);
            if (exam == null)
            {
                return NotFound();
            }
            return new Exam
            {
                Id = exam.Id,
                Name = exam.Name,
                MaxDuration = exam.MaxDuration,
                TeacherId = exam.TeacherId,
                SubjectId = exam.SubjectId,
                QuestionList = questionList,
                CreatedTime = exam.CreatedTime,
            };
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Exam>> PostExam(Exam exam)
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(accessToken);

            int teacherId = Int32.Parse(jwtSecurityToken.Claims.First(claim => claim.Type == "nameid").Value);
            var teacher = await _context.User.FindAsync(teacherId);
            if (teacher.UserTypeId != 2)
            {
                return StatusCode(403, $"User '{teacher.Name}' is not a teacher.");
            }

            var newExam = new Exam
            {
                Name = exam.Name,
                MaxDuration = exam.MaxDuration,
                CreatedTime = DateTime.Now,
                TeacherId = teacherId,
                SubjectId = exam.SubjectId,
                IsDeleted = 0,
                NumOfQuestions = exam.NumOfQuestions,
            };
            _context.Exam.Add(newExam);
            _context.SaveChanges();

            foreach (var question in exam.QuestionList)
            {
                var newQuestion = new Question
                {
                    Content = question.Content,
                    ExamId = newExam.Id,
                };
                _context.Question.Add(newQuestion);
                _context.SaveChanges();
                var correctAnswerId = question.CorrectAnswerId;
                foreach (var answer in question.AnswerList.Select((value, index) => new { index, value }))
                {
                    var newAnswer = new Answer
                    {
                        Content = answer.value.Content,
                        QuestionId = newQuestion.Id,
                    };
                    _context.Answer.Add(newAnswer);
                    _context.SaveChanges();
                    if (correctAnswerId == answer.index)
                        correctAnswerId = newAnswer.Id;
                }

                newQuestion.CorrectAnswerId = correctAnswerId;
                _context.Entry(newQuestion).State = EntityState.Modified;
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetExam), new
            {
                id = newExam.Id
            }, newExam);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExam(int id, Exam exam)
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(accessToken);

            int teacherId = Int32.Parse(jwtSecurityToken.Claims.First(claim => claim.Type == "nameid").Value);
            var teacher = await _context.User.FindAsync(teacherId);
            if (teacher.UserTypeId != 2)
            {
                return StatusCode(403, $"User '{teacher.Name}' is not a teacher.");
            }

            if (id != exam.Id)
            {
                return BadRequest();
            }

            _context.Entry(exam).State = EntityState.Modified;

            foreach (var question in exam.QuestionList.ToList())
            {
                if (question.ExamId == -1)
                {
                    foreach (var answer in question.AnswerList)
                    {
                        _context.Answer.Remove(answer);
                    }
                    _context.Question.Remove(question);
                    await _context.SaveChangesAsync();
                    continue;
                }

                if (question.Id != 0)
                {
                    _context.Entry(question).State = EntityState.Modified;
                    foreach (var answer in question.AnswerList)
                    {
                        _context.Entry(answer).State = EntityState.Modified;
                    }
                }
                else
                {
                    var newQuestion = new Question
                    {
                        Content = question.Content,
                        ExamId = exam.Id,
                    };
                    _context.Question.Add(newQuestion);
                    _context.SaveChanges();
                    var correctAnswerId = question.CorrectAnswerId;
                    foreach (var addAnswer in question.AnswerList.Select((value, index) => new { index, value }))
                    {
                        var newAnswer = new Answer
                        {
                            Content = addAnswer.value.Content,
                            QuestionId = newQuestion.Id,
                        };
                        _context.Answer.Add(newAnswer);
                        _context.SaveChanges();
                        if (correctAnswerId == addAnswer.index)
                            correctAnswerId = newAnswer.Id;
                    }

                    newQuestion.CorrectAnswerId = correctAnswerId;
                    _context.Entry(newQuestion).State = EntityState.Modified;
                    exam.QuestionList.Remove(question);
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExamExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("Success");
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Exam>> DeleteExam(int id)
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(accessToken);

            int teacherId = Int32.Parse(jwtSecurityToken.Claims.First(claim => claim.Type == "nameid").Value);
            var teacher = await _context.User.FindAsync(teacherId);
            if (teacher.UserTypeId != 2)
            {
                return StatusCode(403, $"User '{teacher.Name}' is not a teacher.");
            }

            var exam = await _context.Exam.FindAsync(id);
            if (exam == null)
            {
                return BadRequest();
            }

            exam.IsDeleted = 1;
            _context.Entry(exam).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExamExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("Exam deleted");
        }

        private bool ExamExists(int id)
        {
            return _context.Exam.Any(e => e.Id == id);
        }
    }
}

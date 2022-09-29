using back_end.Data;
using back_end.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using System.IdentityModel.Tokens.Jwt;
using System;
namespace back_end.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAllOrigins")]
    public class ExamController : ControllerBase
    {
        private readonly MyDbContext _context;
        public static int PAGE_SIZE { get; set; } = 5;
        public ExamController(MyDbContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Exam>>> GetExam(string search, int subject = 0, int page = 1)
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var examList = await _context.Exam.AsQueryable().ToListAsync();

            examList = examList.Where(e => e.IsDeleted == 0).ToList();

            // Search
            if (!string.IsNullOrEmpty(search))
            {
                search = search.ToLower();
                examList = examList.Where(e => e.Name.ToLower().Contains(search)).ToList();
            }

            // Filter by Subject
            if (subject > 0)
            {
                examList = examList.Where(e => e.SubjectId == subject).ToList();
            }

            // Pagination
            examList = examList.Skip((page - 1) * PAGE_SIZE).Take(PAGE_SIZE).ToList();


            examList = examList.Select(e => new Exam
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
                //Teacher = e.Teacher,
            }).ToList();

            foreach (var exam in examList)
            {
                var teacher = await _context.User.FindAsync(exam.TeacherId);
                exam.Teacher = teacher;
            }

            if (accessToken == null)
            {
                return examList;
            }

            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(accessToken);

            int studentId = Int32.Parse(jwtSecurityToken.Claims.First(claim => claim.Type == "nameid").Value);



            foreach (var exam in examList)
            {
                var studentExam = await _context.Student_Exam.FindAsync(studentId, exam.Id);

                exam.IsDone = (studentExam == null ? 0 : 1);
            }

            return examList;
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Exam>> GetExam(int id)
        {
            var exam = await _context.Exam.FindAsync(id);

            if (exam == null)
            {
                return NotFound();
            }

            User teacher = await _context.User.FindAsync(exam.TeacherId);
            //Subject subject = await _context.Subject.FindAsync(exam.SubjectId);

            return new Exam
            {
                Id = exam.Id,
                Name = exam.Name,
                MaxDuration = exam.MaxDuration,
                CreatedTime = exam.CreatedTime,
                TeacherId = exam.TeacherId,
                SubjectId = exam.SubjectId,
                IsDone = exam.IsDone,
                NumOfQuestions = exam.NumOfQuestions,
                Teacher = teacher,
            };
        }

        [Authorize]
        [HttpGet("take/{id}")]
        public async Task<ActionResult<Exam>> TakeExam(int id)
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(accessToken);

            int studentId = Int32.Parse(jwtSecurityToken.Claims.First(claim => claim.Type == "nameid").Value);
            int examId = id;

            List<Question> questionList = (
            from e in _context.Exam
            join q in _context.Question on e.Id equals q.ExamId
            where e.Id == examId
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
            var exam = await _context.Exam.FindAsync(examId);

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

            User teacher = await _context.User.FindAsync(exam.TeacherId);

            return new Exam
            {
                Id = exam.Id,
                Name = exam.Name,
                MaxDuration = exam.MaxDuration,
                TeacherId = exam.TeacherId,
                SubjectId = exam.SubjectId,
                QuestionList = questionList,
                Teacher = teacher,
            };
        }

        [Authorize]
        [HttpGet("result/{id}")]
        //public async Task<ActionResult<StudentExamResult>> GetStudentExamResult(int examId, int studentId)
        public async Task<ActionResult<StudentExamResult>> GetStudentExamResult(int id) //id <=> examID
        {

            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(accessToken);

            int studentId = Int32.Parse(jwtSecurityToken.Claims.First(claim => claim.Type == "nameid").Value);
            int examId = id;
            //List<QuestionResult> questionResultList = null;
            //foreach (var question in _context.Question)
            //{
            //    QuestionResult temp = null;
            //    temp.Id = question.Id;
            //    temp.Content = question.Content;
            //    temp.CorrectAnswerId = question.CorrectAnswerId;
            //    temp.ExamId = question.ExamId;
            //    temp.ListAnswers = question.ListAnswers;
            //    //questionResultList
            //}    
            List<QuestionResult> questionResultList = (
            from sec in _context.Student_Exam_Choice
            join q in _context.Question on sec.QuestionId equals q.Id
            where sec.ExamId == examId && sec.StudentId == studentId
            select (new QuestionResult
            {
                Id = q.Id,
                Content = q.Content,
                CorrectAnswerId = q.CorrectAnswerId,
                ChosenAnswerId = sec.ChosenAnswerId
            })
            ).ToList();
            foreach (var question in questionResultList)
            {
                List<Answer> answers = (
                from a in _context.Answer
                join q in _context.Question on a.QuestionId equals q.Id
                where q.Id == question.Id
                select a
                ).ToList();
                question.AnswerList = answers;
            }
            var examResult = await _context.Student_Exam.FindAsync(studentId, examId); // student
            var exam = await _context.Exam.FindAsync(examId);
            var teacher = await _context.User.FindAsync(exam.TeacherId);
            var subject = await _context.Subject.FindAsync(exam.SubjectId);
            //var exam = await _context.Exam.Select(e => new Exam {
            //    Id = e.Id,
            //    Name = e.Name,
            //    MaxDuration = e.MaxDuration,
            //    CreatedTime = e.CreatedTime,
            //    TeacherId = e.TeacherId,
            //    SubjectId = e.SubjectId,
            //}).FindAsync(id);
            if (examResult == null)
            {
                return NotFound();
            }
            return new StudentExamResult
            {
                Id = examResult.ExamId,
                Name = exam.Name,
                Teacher = teacher.Name,
                Subject = subject.Name,
                Point = examResult.Point,
                MaxDuration = exam.MaxDuration,
                Duration = examResult.Duration,
                StartTime = examResult.SubmitTime,
                QuestionResultList = questionResultList
            };
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutExam(int id, Exam exam)
        //{
        //    if (id != exam.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(exam).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ExamExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        // POST: api/Exam
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        //[HttpPost]
        //public async Task<ActionResult<Exam>> PostExam(Exam exam)
        //{
        //    DateTime now = DateTime.Now;
        //    var newExam = new Exam
        //    {
        //        Id = exam.Id,
        //        Name = exam.Name,
        //        MaxDuration = exam.MaxDuration,
        //        CreatedTime = now,
        //        TeacherId = exam.TeacherId,
        //        SubjectId = exam.SubjectId
        //    };
        //    //_context.Exam.Add(exam);
        //    _context.Exam.Add(newExam);

        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction(nameof(GetExam), new
        //    {
        //        id = exam.Id
        //    }, newExam);
        //}


        [Authorize]
        [HttpPost("take/{id}")]
        public async Task<ActionResult<StudentExam>> PostExam(ExamSubmit exam, int id)
        {
            // DateTime now = DateTime.Now;
            //var newExam = new Exam
            //{
            //    Id = exam.Id,
            //    Name = exam.Name,
            //    MaxDuration = exam.MaxDuration,
            //    CreatedTime = now,
            //    TeacherId = exam.TeacherId,
            //    SubjectId = exam.SubjectId
            //};
            //_context.Exam.Add(exam);

            //System.Diagnostics.Debug.WriteLine(exam.StudentExam);

            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(accessToken);

            int studentId = Int32.Parse(jwtSecurityToken.Claims.First(claim => claim.Type == "nameid").Value);

            exam.StudentExam.StudentId = studentId;
            exam.StudentExam.ExamId = id;
            exam.StudentExam.SubmitTime = DateTime.Now;

            _context.Student_Exam.Add(exam.StudentExam);
            //_context.SaveChanges();
            await _context.SaveChangesAsync();

            foreach (var choice in exam.StudentChoiceList)
            {
                choice.ExamId = id;
                choice.StudentId = studentId;
                _context.Student_Exam_Choice.Add(choice);
            }
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetExam), new
            {
                id = exam.Id
            }, exam.StudentExam);
        }
        //// DELETE: api/Exam/5
        //[HttpDelete("{id}")]
        //public async Task<ActionResult<Exam>> DeleteExam(int id)
        //{
        //    var Exam = await _context.Exam.FindAsync(id);
        //    if (Exam == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Exam.Remove(Exam);
        //    await _context.SaveChangesAsync();

        //    return Exam;
        //}
        //private bool ExamExists(int id)
        //{
        //    return _context.Exam.Any(e => e.Id == id);
        //}
    }
}

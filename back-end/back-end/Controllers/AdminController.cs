using back_end.Data;
using back_end.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SelectPdf;
using Syncfusion.Pdf.Graphics;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAllOrigins")]
    public class AdminController : ControllerBase
    {
        private readonly MyDbContext _context;

        public static int PAGE_SIZE { get; set; } = 5;

        public AdminController(MyDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("userList")]
        public async Task<ActionResult<IEnumerable<User>>> GetUserList(string search, int role, string sort, int page = 1)
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(accessToken);

            int adminId = Int32.Parse(jwtSecurityToken.Claims.First(claim => claim.Type == "nameid").Value);
            var admin = await _context.User.FindAsync(adminId);

            if (admin.UserTypeId != 3)
            {
                return StatusCode(403, $"User '{admin.Name}' is not a admin.");
            }

            var userList = await _context.User.AsQueryable().ToListAsync();

            if (!string.IsNullOrEmpty(search))
            {
                search = search.ToLower();
                userList = userList.Where(e => e.Name.ToLower().Contains(search)).ToList();
            }

            if (role > 0)
            {
                userList = userList.Where(e => e.UserTypeId == role).ToList();
            }

            if (sort == "name")
            {
                userList = userList.OrderBy(e => e.Name).ToList();
            }
            else if (sort == "email")
            {
                userList = userList.OrderBy(e => e.Email).ToList();
            }

            userList = userList.Skip((page - 1) * PAGE_SIZE).Take(PAGE_SIZE).ToList();

            userList = userList.Select(e => new User
            {
                Id = e.Id,
                Name = e.Name,
                Email = e.Email,
                Phone = e.Phone,
                DateOfBirth = e.DateOfBirth,
                CitizenId = e.CitizenId,
                Address = e.Address,
                UserTypeId = e.UserTypeId,
                IsDeleted = e.IsDeleted,
            }).ToList();

            return userList;
        }

        //[Authorize]
        //[HttpPut("user/{id}")]
        //public async Task<IActionResult> PutAccount(int id, Account account)
        //{
        //    var accessToken = await HttpContext.GetTokenAsync("access_token");
        //    var handler = new JwtSecurityTokenHandler();
        //    var jwtSecurityToken = handler.ReadJwtToken(accessToken);

        //    int adminId = Int32.Parse(jwtSecurityToken.Claims.First(claim => claim.Type == "nameid").Value);
        //    var admin = await _context.User.FindAsync(adminId);
        //    if (admin.UserTypeId != 3)
        //    {
        //        return StatusCode(403, $"User '{admin.Name}' is not a admin.");
        //    }

        //    if (id != account.UserId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(account).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!AccountExists(id))
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

        //private bool AccountExists(int id)
        //{
        //    return _context.Account.Any(e => e.UserId == id);
        //}

        [Authorize]
        [HttpGet("createUserListPDF")]
        public async Task<IActionResult> CreateUserListPDF(int role = 0)
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(accessToken);

            int adminId = Int32.Parse(jwtSecurityToken.Claims.First(claim => claim.Type == "nameid").Value);
            var admin = await _context.User.FindAsync(adminId);
            if (admin.UserTypeId != 3)
            {
                return StatusCode(403, $"User '{admin.Name}' is not a admin.");
            }

            var userList = await _context.User.AsQueryable().ToListAsync();

            if (role != 0)
            {
                userList = userList.Where(e => e.UserTypeId == role).ToList();
            }

            HtmlToPdf converter = new HtmlToPdf();

            PdfTextSection pageNumberingText = new PdfTextSection(0, 20, "Page {page_number} of {total_pages}", new Font("Arial", 10, FontStyle.Bold));
            pageNumberingText.HorizontalAlign = PdfTextHorizontalAlign.Center;
            converter.Footer.Add(pageNumberingText);

            PdfTextSection header = new PdfTextSection(100, 0, "ExamGo - User List", new Font("Arial", 12, FontStyle.Underline));
            header.HorizontalAlign = PdfTextHorizontalAlign.Left;
            converter.Header.Add(header);

            // set converter options
            converter.Options.PdfPageSize = PdfPageSize.A4;
            converter.Options.PdfPageOrientation = PdfPageOrientation.Landscape;
            converter.Options.DisplayFooter = true;
            converter.Options.DisplayHeader = true;
            converter.Options.MarginLeft = 10;
            converter.Options.MarginRight = 10;
            converter.Options.MarginTop = 20;
            converter.Options.MarginBottom = 20;

            var htmlStringBuilder = new StringBuilder();
            var roleFilter = (role == 1 ? "Học sinh" : role == 2 ? "Giáo viên" : role == 3 ? "Quản trị viên" : "Tất cả");

            htmlStringBuilder.Append(@"
                        <html>
                            <head>
                                <style>
                                    table, th, td {
                                        border: thin solid orange;
                                        border-collapse: collapse;
                                    }
                                    
                                    table tr:first-child {
                                        color: white;
                                        background-color: orange;
                                    }
                                    
                                    .header {
                                        font-weight: bold;
                                    }

                                    .header h5 {
                                        color: red;
                                        font-size: 20;
                                        margin-bottom: 0px;
                                        padding-bottom: 0px;
                                    }
                                </style>
                            </head>");

            htmlStringBuilder.AppendFormat(@"
                            <body style='text-align: center'>
                                <div class='header'>
                                    <h5>Danh sách người dùng</h5>
                                    <p>Vai trò: {0}</p>
                                </div>
                                <table align='center'>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tên</th>
                                        <th>Email</th>
                                        <th>SĐT</th>
                                        <th>CCCD</th>
                                        <th>Địa chỉ</th>
                                        <th>Vai trò</th>
                                    </tr>"
                        , roleFilter);

            foreach (var user in userList)
            {
                var userType = (user.UserTypeId == 1 ? "Học sinh" : user.UserTypeId == 2 ? "Giáo viên" : "Quản trị viên");

                htmlStringBuilder.AppendFormat(@"
                                    <tr>
                                        <td>{0}</td>
                                        <td>{1}</td>
                                        <td>{2}</td>
                                        <td>{3}</td>
                                        <td>{4}</td>
                                        <td>{5}</td>
                                        <td>{6}</td>
                                    </tr>"
                                  , user.Id, user.Name, user.Email, user.Phone, user.CitizenId, user.Address, userType);
            }


            htmlStringBuilder.Append(@"
                                </table>
                            </body>
                        </html>");

            // create a new pdf document converting an html string
            PdfDocument pdfDocument = converter.ConvertHtmlString(htmlStringBuilder.ToString());

            pdfDocument.AddTemplate(pdfDocument.Pages[0].ClientRectangle.Width, 100);
            //pdfDocument.AddPage();

            // file name: Example: user-list_student_2022-06-18T15-00-19.pdf
            var fileName = "user-list_" + (role == 1 ? "student_" : role == 2 ? "teacher_" : role == 3 ? "admin_" : "all_") + DateTime.Now.ToString("s") + ".pdf";

            // save pdf document
            var bytes = pdfDocument.Save();

            // close pdf document
            pdfDocument.Close();

            return File(bytes, "application/pdf", fileName);

        }

        [Authorize]
        [HttpGet("examList")]
        public async Task<ActionResult<IEnumerable<ExamWithTakenCount>>> GetExamList(string search, int subject, string sort, int page = 1)
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(accessToken);

            int adminId = Int32.Parse(jwtSecurityToken.Claims.First(claim => claim.Type == "nameid").Value);
            var admin = await _context.User.FindAsync(adminId);

            if (admin.UserTypeId != 3)
            {
                return StatusCode(403, $"User '{admin.Name}' is not a admin.");
            }

            var examList = await _context.Exam.AsQueryable().ToListAsync();

            if (!string.IsNullOrEmpty(search))
            {
                search = search.ToLower();
                examList = examList.Where(e => e.Name.ToLower().Contains(search)).ToList();
            }

            if (subject > 0)
            {
                examList = examList.Where(e => e.SubjectId == subject).ToList();
            }

            var examWithTakenCountList = examList.Select(e => new ExamWithTakenCount
            {
                Id = e.Id,
                Name = e.Name,
                MaxDuration = e.MaxDuration,
                CreatedTime = e.CreatedTime,
                IsDeleted = e.IsDeleted,
                TeacherId = e.TeacherId,
                SubjectId = e.SubjectId,
                Teacher = e.Teacher,
            }).ToList();

            foreach (var examWithTakenCount in examWithTakenCountList)
            {
                var studentExamList = await _context.Student_Exam.Where(e => e.ExamId == examWithTakenCount.Id).ToListAsync();
                examWithTakenCount.takenCount = studentExamList.Count();
                var teacher = await _context.User.FindAsync(examWithTakenCount.TeacherId);
                examWithTakenCount.Teacher = teacher;
            }

            if (sort == "numberOfTaken")
            {
                examWithTakenCountList = examWithTakenCountList.OrderBy(e => e.takenCount).ToList();
            }
            else if (sort == "name")
            {
                examWithTakenCountList = examWithTakenCountList.OrderBy(e => e.Name).ToList();
            }

            examWithTakenCountList = examWithTakenCountList.Skip((page - 1) * PAGE_SIZE).Take(PAGE_SIZE).ToList();


            return examWithTakenCountList;
        }

        [Authorize]
        [HttpPut("editUser/{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(accessToken);

            int adminId = Int32.Parse(jwtSecurityToken.Claims.First(claim => claim.Type == "nameid").Value);
            var admin = await _context.User.FindAsync(adminId);

            if (admin.UserTypeId != 3)
            {
                return StatusCode(403, $"User '{admin.Name}' is not a admin.");
            }

            // _context.Entry(user).State = EntityState.Modified;
            var editUser = _context.User.FirstOrDefault(e => e.Id == id);

            if (editUser != null)
            {
                editUser.Name = user.Name;
                editUser.Email = user.Email;
                editUser.Phone = user.Phone;
                editUser.DateOfBirth = user.DateOfBirth;
                editUser.CitizenId = user.CitizenId;
                editUser.Address = user.Address;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok("Successfully change your information");
        }

        [Authorize]
        [HttpPut("changeUserState1/{id}")]
        public async Task<ActionResult<User>> ChangeUserState(int id)
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(accessToken);

            int adminId = Int32.Parse(jwtSecurityToken.Claims.First(claim => claim.Type == "nameid").Value);
            var admin = await _context.User.FindAsync(adminId);

            if (admin.UserTypeId != 3)
            {
                return StatusCode(403, $"User '{admin.Name}' is not a admin.");
            }

            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return BadRequest();
            }
            user.IsDeleted ^= 1; //0->1 and vice versa; another way: user.IsDeleted = 1 - user.IsDeleted
            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!_context.User.Any(e => e.Id == id))
                //{
                //    return NotFound();
                //}
                //else
                //{
                //    throw;
                //}
                throw;
            }

            return Ok("User deleted");
        }

        [Authorize]
        [HttpGet("statistics")]
        public async Task<ActionResult<IEnumerable<StudentRecordStatistics>>> GetStudentStatistic()
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(accessToken);

            int adminId = Int32.Parse(jwtSecurityToken.Claims.First(claim => claim.Type == "nameid").Value);
            var admin = await _context.User.FindAsync(adminId);

            if (admin.UserTypeId != 3)
            {
                return StatusCode(403, $"User '{admin.Name}' is not a admin.");
            }

            var studentList = await _context.User.Where(e => e.UserTypeId == 1).ToListAsync();

            var studentRecordList = new List<StudentRecordStatistics>();
            //var studentResultList
            //var examList = await _context.Exam.ToListAsync();
            var examList = await _context.Exam.AsQueryable().ToListAsync();

            //examList = examList.Where(e => e.IsDeleted == 0).ToList();

            foreach (var student in studentList)
            {

                var examResultList = examList.Select(e => new ExamResult
                {
                    Id = e.Id,
                    StudentExam = null,
                }).ToList();

                foreach (var examResult in examResultList)
                {
                    var studentExam = await _context.Student_Exam.FindAsync(student.Id, examResult.Id);
                    if (studentExam == null)
                    {
                        continue;
                    }

                    //examResult.IsDone = (studentExam==null?0:1);
                    examResult.StudentExam = studentExam;
                }

                examResultList = examResultList.Where(e => e.StudentExam != null).ToList();
                //if (flag == 1)
                //{
                //    continue;
                //}    

                int count = examResultList.Count();

                if (count == 0)
                {
                    continue;
                }


                double averagePoint = examResultList.Sum(e => e.StudentExam.Point) / count;
                int averageDuration = (int)(Math.Ceiling(examResultList.Sum(e => (double)(e.StudentExam.Duration)) / count));

                studentRecordList.Add(new StudentRecordStatistics
                {
                    NumberOfTakenExams = count,
                    AveragePoint = averagePoint,
                    AverageDuration = averageDuration,
                    User = student,
                });
            }

            studentRecordList = studentRecordList.OrderByDescending(e => e.AveragePoint).ThenByDescending(e => e.NumberOfTakenExams).ThenBy(e => e.AverageDuration).ToList();
            studentRecordList = studentRecordList.Take(10).ToList();

            return studentRecordList;
        }
    }
}

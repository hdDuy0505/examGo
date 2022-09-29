using back_end.Models;
using Microsoft.EntityFrameworkCore;

namespace back_end.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StudentExam>()
                .HasKey(st => new { st.StudentId, st.ExamId });
            //.HasKey(nameof(back_end.Models.StudentExam.StudentId), nameof(back_end.Models.StudentExam.ExamId));
            modelBuilder.Entity<StudentExamChoice>()
                .HasKey(st => new { st.StudentId, st.ExamId, st.QuestionId });
            //.HasKey(nameof(back_end.Models.StudentExamChoices.StudentId), nameof(back_end.Models.StudentExamChoices.ExamId), nameof(back_end.Models.StudentExamChoices.QuestionId));
            modelBuilder.Entity<User>().Property(p => p.Id).ValueGeneratedOnAdd();
        }
        public DbSet<Account> Account { get; set; }
        public DbSet<Exam> Exam { get; set; }
        public DbSet<StudentExam> Student_Exam { get; set; }
        public DbSet<StudentExamChoice> Student_Exam_Choice { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<UserType> UserType { get; set; }
        public DbSet<Subject> Subject { get; set; }
        public DbSet<Question> Question { get; set; }
        public DbSet<Answer> Answer { get; set; }

    }
}

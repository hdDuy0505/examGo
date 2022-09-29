using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Models
{
    public class StudentRecord
    {
        public int Id { get; set; }
        public int NumberOfTakenExams { get; set; } = 0;
        public double AveragePoint { get; set; } = 0;
        public int AverageDuration { get; set; } = 0;

    }

    public class StudentRecordStatistics:StudentRecord
    {
        public User User { get; set; }
    }    
}

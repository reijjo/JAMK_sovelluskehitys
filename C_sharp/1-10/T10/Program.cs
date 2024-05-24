using System;
using System.Collections.Generic;

namespace T10 // Note: actual namespace depends on the project name.
{
    public class Student
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int Grade { get; set; }

        public override string ToString()
        {
            return $"Id: {Id}, Name: {Name}, Grade: {Grade}";
        }
    }

    internal class Program
    {
        static void Main(string[] args)
        {
            List<Student> students = new();
           
            static int RandomId()
            {
                Random random = new Random();
                return random.Next(1000, 9999);
            }

            static int RandomGrade()
            {
                Random random = new Random();
                return  random.Next(0, 6);
            }

            students.Add(new Student { Name = "Eka Tyyppi", Id = RandomId(), Grade = RandomGrade()});
            students.Add(new Student { Name = "Toka Tyyppi", Id = RandomId(), Grade = RandomGrade() });
            students.Add(new Student { Name = "Kolmas Tyyppi", Id = RandomId(), Grade = RandomGrade() });
            students.Add(new Student { Name = "Neljas Tyyppi", Id = RandomId(), Grade = RandomGrade() });
            students.Add(new Student { Name = "Viides Tyyppi", Id = RandomId(), Grade = RandomGrade() });

            Console.WriteLine("Student info:");
            foreach (var student in students)
            {
                Console.WriteLine(student);
            }
        }
    }
}
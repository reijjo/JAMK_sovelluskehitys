using System;

namespace T15
{
    public class Employee
    {
        public string? Name { get; set; }
        public string? Profession { get; set; }
        public int Salary { get; set; }

        public override string ToString()
        {
            return $"- Name: {Name} Profession: {Profession} Salary: {Salary}";
        }
    }

    public class Boss
    {
        public string? Name { get; set; }
        public string? Profession { get; set; }
        public int Salary { get; set; }
        public string? Car { get; set; }
        public int Bonus { get; set; }

        public override string ToString()
        {
            return $"- Name: {Name} Profession: {Profession} Salary: {Salary} Car: {Car} Bonus: {Bonus}";
        }
    }

    internal class Program
    {
        static void Main(string[] args)
        {
            Employee eka = new()
            {
                Name = "Kirsi Kernel",
                Profession = "Teacher",
                Salary = 1200
            };

            Boss pomo = new()
            {
                Name = "Heidi Husso",
                Profession = "Head of Institute",
                Salary = 9000,
                Car = "Audi",
                Bonus = 5000
            };

            Employee toka = new()
            {
                Name = "Kirsi Kernel",
                Profession = "Principal Teacher",
                Salary = 2200
            };

            Console.WriteLine(eka);
            Console.WriteLine(pomo);
            Console.WriteLine(toka);
        }
    }
}
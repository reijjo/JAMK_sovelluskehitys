using System;

namespace T20 // Note: actual namespace depends on the project name.
{
    public abstract class Mammal
    {
        public int Age { get; set; }

        public abstract void Move();
    }

    public abstract class Human : Mammal
    {
        public float Weight { get; set; }
        public float Height { get; set; }
        public string? Name { get; set; }

        public override void Move()
        {
            Console.WriteLine("Moving");
        }

        public void Grow()
        {
            Age++;
        }
    }

    public class Baby : Human
    {
        public string? Diaper { get; set; }

        public override void Move()
        {
            Console.WriteLine("Crawling");
        }
    }

    public class Adult : Human
    {
        public string? Auto { get; set; }

        public override void Move()
        {
            Console.WriteLine("Walking");
        }
    }

    internal class Program
    {
        static void Main(string[] args)
        {
            // Create instances of Baby and Adult
            Baby baby = new Baby
            {
                Age = 1,
                Weight = 8.0f,
                Height = 60.0f,
                Name = "Baby",
                Diaper = "Pampers"
            };

            Adult adult = new Adult
            {
                Age = 30,
                Weight = 70.0f,
                Height = 175.0f,
                Name = "Adult",
                Auto = "Sedan"
            };

            Console.WriteLine("Baby:");
            Console.WriteLine($"Age: {baby.Age}, Weight: {baby.Weight}, Height: {baby.Height}, Name: {baby.Name}, Diaper: {baby.Diaper}");
            baby.Move();

            Console.WriteLine("\nAdult:");
            Console.WriteLine($"Age: {adult.Age}, Weight: {adult.Weight}, Height: {adult.Height}, Name: {adult.Name}, Auto: {adult.Auto}");
            adult.Move();
        }
    }
}
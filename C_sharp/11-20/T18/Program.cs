using System;

namespace T18
{
    public class Bookshelf
    {
        public int Id { get; set; }
    }

    public class Book : Bookshelf
    {
        public string? Title { get; set; }

        public override string ToString()
        {
            return $"Id: {Id} Title: {Title}";
        }
    }

    public class Laptop : Bookshelf
    {
        public string? Brand { get; set; }

        public override string ToString()
        {
            return $"Id: {Id} Brand: {Brand}";
        }
    }

    internal class Program
    {
        static void Main(string[] args)
        {
            Book kirja = new Book()
            {
                Id = 1,
                Title = "The subtle art of not giving a fuck"
            };

            Laptop eka = new Laptop()
            {
                Id = 2,
                Brand = "Apple"
            };

            Laptop toka = new Laptop()
            {
                Id = 3,
                Brand = "HP"
            };

            Console.WriteLine(kirja);
            Console.WriteLine(eka);
            Console.WriteLine(toka);
        }
    }
}
using System;

namespace T05 // Note: actual namespace depends on the project name.
{
    internal class Program
    {
        struct People
        {
            public string Name;
            public int Year;
        }

        static void Main(string[] args)
        {
            // Create new list
            List<People> persons = new();

            Console.WriteLine("Please, give names and birth year of a person. Empty input will stop the input.");

            while (true)
            {
                Console.Write("Give a name: ");
                string? userInput = Console.ReadLine();

                // Break the loop if no input
                if (string.IsNullOrWhiteSpace(userInput)) {
                    break;
                }

                // Make an array from the input
                string[] peopleArray = userInput.Split(',');

                // Check the input is correct
                if (peopleArray.Length == 2 && int.TryParse(peopleArray[1], out int born))
                {

                    // Add the person to struct
                    persons.Add(new People { Name = peopleArray[0].Trim(), Year = born });
                } else
                {
                    Console.WriteLine("Invalid input");
                }        
            }

            Console.WriteLine($"{persons.Count} names are given:");

            persons.Sort((p1, p2) => p2.Year.CompareTo(p1.Year));

            foreach (var who in persons)
            {
                Console.WriteLine($"{who.Name} is {DateTime.Now.Year - who.Year} years old.");
            }

            Console.WriteLine("Press any key to quit...");
            Console.ReadKey();
        }
    }
}
using System;

namespace T01
{
    internal class Program
    {
        static string GiveGrade(int points)
        {
            if (points >= 0 && points <= 19)
            {
                return "0";
            } else if (points >= 19 && points <= 29)
            {
                return "1";
            } else if (points >= 30 && points <= 39)
            {
                return "2";
            } else if (points >= 40 && points <= 49)
            {
                return "3";
            } else if (points >= 50 && points <= 59)
            {
                return "4";
            } else if (points >= 60 && points <= 70)
            {
                return "5";
            } else
            {
                return "invalid input";
            }
        }

        static void Main(string[] args)
        {

            Console.Write("Give points: ");
            string? userInput = Console.ReadLine();


            if (!int.TryParse(userInput, out int grade) || int.Parse(userInput) < 0 || int.Parse(userInput) > 70)
            {
                Console.WriteLine("Invalid input");
            } else
            {
                Console.WriteLine(GiveGrade(grade));
            }

            
        }
    }
}
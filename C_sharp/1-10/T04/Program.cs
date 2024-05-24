using System;

namespace T04 // Note: actual namespace depends on the project name.
{
    internal class Program
    {
        static bool Palindrome(string input)
        {
            char[] wordAsArray = input.ToCharArray();
            Array.Reverse(wordAsArray);
            string word = new(wordAsArray);
           

            return input == word;
        }

        static void Main(string[] args)
        {
            Console.Write("Give me a word: ");
            string? userInput = Console.ReadLine();

            if (userInput != null && Palindrome(userInput))
            {
                Console.WriteLine("Woopwoop, that IS a palindrome.");
            } else
            {
                Console.WriteLine("That is NOT a palindrome.");
            }
        }
    }
}
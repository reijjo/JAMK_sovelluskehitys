using System;

namespace T08 // Note: actual namespace depends on the project name.
{
    internal class Program
    {
        public class Tv
        {
            public bool OnOff { get; set; }
            public int Kanava { get; set; }

            public Tv()
            {
                OnOff = false;
                Kanava = 0;
            }

            public override string ToString()
            {
                return $"Paalla?: {OnOff}, Kanava: {Kanava}";
            }
        }

        static void Main(string[] args)
        {
            Tv toosa = new();

            Console.WriteLine($"What? {toosa}");

            Console.WriteLine("Laitetaanko tv paalle? y/n");
            string? userInput = Console.ReadLine();

            if (userInput == "y")
            {
                toosa.OnOff = true;

                Console.Write("Mikas kanava?");
                string? kanava = Console.ReadLine();

                if (int.TryParse(kanava, out int channel))
                {
                    toosa.Kanava = channel;
                    Console.WriteLine(toosa);
                } else
                {
                    toosa.OnOff = false;
                    Console.WriteLine($"Invalid input {toosa}");
                }
            } else
            {
                Console.WriteLine("Ok, bye.");
                Console.WriteLine(toosa);

            }
        }
    }
}
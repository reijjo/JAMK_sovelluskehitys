using System;

namespace T07 // Note: actual namespace depends on the project name.
{

    public class WashingMachine
    {
        public bool OnOff { get; set; }
        public bool Pikapesu { get; set; }
        public bool Isopesu { get; set; }

        public WashingMachine()
        {
            OnOff = false;
            Pikapesu = false;
            Isopesu = false;
        }

        public override string ToString()
        {
            return $"OnOff: {OnOff}, Pikapesu: {Pikapesu}, Isopesu: {Isopesu}";
        }
    }

    // Main
    internal class Program
    {
        static void Main(string[] args)
        {
            WashingMachine kone = new();

            Console.WriteLine("Laitetaanko kone paalle? y/n");
            string? userInput = Console.ReadLine();

            if (userInput == "y")
            {
                kone.OnOff = true;

                Console.WriteLine();
                Console.WriteLine("Valitse pesu: ");
                Console.WriteLine("Pikapesu: 1");
                Console.WriteLine("Isopesu: 2");

                string? mikapesu = Console.ReadLine();

                if (int.TryParse(mikapesu, out int pesu))
                {
                    if (pesu == 1)
                    {
                        kone.Pikapesu = true;

                        Console.WriteLine("Ok pikapesu!");
                        Console.WriteLine(kone);

                    }
                    else if (pesu == 2)
                    {
                        kone.Isopesu = true;

                        Console.WriteLine("Isoo pesuu!");
                        Console.WriteLine(kone);
                    } else
                    {
                        Console.WriteLine("Invalid input.");
                        Console.WriteLine(kone);

                    }
                }
            } else
            {
                kone.OnOff = false;
                Console.WriteLine(kone);

                Console.WriteLine("Ok bye.");
            }
        }
    }
}
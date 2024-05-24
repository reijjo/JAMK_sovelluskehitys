using System;

namespace T06 // Note: actual namespace depends on the project name.
{

    public class Heater
    {
        public bool OnOff { get; set; }
        public int Temperature { get; set; }
        public int Humidity { get; set; }
    }

    internal class Program
    {
        static void Main(string[] args)
        {
            Heater sauna = new();

            sauna.OnOff = true;

            while (sauna.OnOff)
            {
                Console.WriteLine("Sauna is on!");

                Console.Write("Give temperature:");
                string? temp = Console.ReadLine();

                if (int.TryParse(temp, out int temp1))
                {
                    sauna.Temperature = temp1;
                } else
                {
                    Console.WriteLine("Input must be a number");
                }

                Console.Write("Give humidity:");
                string? humid = Console.ReadLine();

                if (int.TryParse(humid, out int humid1))
                {
                    sauna.Humidity = humid1;
                }
                else
                {
                    Console.WriteLine("Input must be a number");
                }

                Console.WriteLine("Sauna is on!");
                Console.WriteLine($"Temperature {sauna.Temperature}, Humidity {sauna.Humidity}");

                Console.Write("Turn sauna off? y/n ");
                string? turnOff = Console.ReadLine();

                if (turnOff == "y")
                {
                    sauna.OnOff = false;
                }

            }

            Console.WriteLine("Ok, bye.");
            
        }
    }
}
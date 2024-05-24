using System;

namespace T03
{
    internal class Program
    {
        static (double, double) Consumption(int km)
        {
            Random random = new();
            int consumption = random.Next(6, 9);
            double price = (double)(random.NextDouble() * (2.50 - 1.75) + 1.75);

            double liters = (double)km * consumption / 100;
            double cost = liters * price;

            return (liters, cost);
        }

        static void Main(string[] args)
        {
            Console.Write("Enter distance traveled: ");

            string? distance = Console.ReadLine();

            if (int.TryParse(distance, out int km))
            {
                var result = Consumption(km);
                Console.WriteLine($"Fuel consumption is {result.Item1:F2} and it costs {result.Item2:F2} euros .");
            }
            else
            {
                Console.WriteLine("Invalid input");
            }
            
        }
    }
}
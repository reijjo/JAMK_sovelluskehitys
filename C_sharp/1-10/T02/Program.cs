using System;

namespace T02
{
    internal class Program
    {
        static int Points(int[] points)
        {
            int small = points[0];
            int big = points[0];
            int sum = points[0];
            int i = 1;

            while (i < points.Length)
            {
                sum += points[i];

                if (points[i] < small)
                {
                    small = points[i];
                }

                if (points[i] > big)
                {
                    big = points[i];
                }
                i++;
            }
            int total = sum - small - big;
            return (total);
        }

        static void Main(string[] args)
        {
            int i = 0;
            int[] allPoints = new int[5];

            while (i < 5)
            {
                Console.WriteLine("Give points: ");
                string? userInput = Console.ReadLine();

                if (!int.TryParse(userInput, out int points))
                {
                    Console.WriteLine("Invalid input.");
                    return;
                }
                else
                {
                    allPoints[i] = points;
                    i++;
                }

            }

            int total = Points(allPoints);
            Console.WriteLine($"Total points are {total}");
        }

    }
}
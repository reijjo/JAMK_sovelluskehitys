using System;

namespace T13 // Note: actual namespace depends on the project name.
{
    public class Elevator
    {
        public int CurrentFloor { get;  set; }

        public bool GoTo(int floor, out string message)
        {
            if (floor < 1)
            {
                message = "Floor is too small!";
                return true;
            } else if (floor > 5)
            {
                message = "Floor is too big!";
                return true;
            }
            else 
            {
                CurrentFloor = floor;
                message = $"Elevator is now on floor: {CurrentFloor}";
                return true;
            }
        }
    }

    
    internal class Program
    {
        static void Main(string[] args)
        {
            Elevator hissi = new()
            {
                CurrentFloor = 1
            };

            Console.WriteLine($"Elevator is now on floor: {hissi.CurrentFloor}");

            while (true)
            {
                Console.Write("Give a new floor number (1-5) > ");

                if (int.TryParse(Console.ReadLine(), out int kerros))
                {
                    if (hissi.GoTo(kerros, out string message))
                    {
                        Console.WriteLine(message);
                    }
                    else
                    {
                        Console.WriteLine(message);
                    }
                }
                else
                {
                    Console.WriteLine("Invalid input. Please enter a valid floor number.");
                }
            }
        }
    }
}
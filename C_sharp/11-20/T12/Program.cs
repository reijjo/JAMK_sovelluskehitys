using System;

namespace T12 // Note: actual namespace depends on the project name.
{
    public class RalleyCar
    {
        public string? Name { get; set; }
        public string? Type { get; set; }
        public float Speed { get; private set; }
        public float SpeedMax { get;  }

        public RalleyCar(string name, string type)
        {
            Name = name;
            Type = type;
            SpeedMax = 200;
        }

        public void AccelerateTo(float speed)
        {
            if (speed <= SpeedMax && speed >= 0)
            {
                Speed = speed;
            }

            
        }

        public void SlowTo(float speed)
        {
            if (speed <= SpeedMax && speed > 0)
            {
                Speed = speed;
            }
            
        }
    }

    internal class TestRalley
    {
        static void Main(string[] args)
        {
            RalleyCar ralli = new RalleyCar("Hopeanuoli", "Audi");

            Console.WriteLine($"Your rallycar: name: {ralli.Name}, type: {ralli.Type}");
            Console.Write("Do you want to accelerate (1) or slow (2) your car (any other key quits) ");
            string? userInput = Console.ReadLine();

            while (userInput == "1" || userInput == "2")
            {
                if (int.TryParse(userInput, out int input))
                {
                    if (input == 1)
                    {
                        Console.Write("Accelerate to: ");
                        string? acc = Console.ReadLine();

                        if (float.TryParse(acc, out float accSpeed))
                        {
                            if (accSpeed <= 200)
                            {
                                ralli.AccelerateTo(accSpeed);
                                Console.WriteLine($"{ralli.Name} speed: {ralli.Speed}");
                            }
                            else
                            {
                                Console.WriteLine("200 is the max speed");
                            }
                        }
                        else
                        {
                            Console.WriteLine("Invalid input for acceleration speed.");
                        }
                    }
                    else if (input == 2)
                    {
                        Console.Write("Slow to: ");
                        string? slow = Console.ReadLine();

                        if (float.TryParse(slow, out float slowSpeed))
                        {
                            if (slowSpeed < 0)
                            {
                                Console.WriteLine("Only positive numbers");
                            }
                            else
                            {
                                ralli.SlowTo(slowSpeed);
                                Console.WriteLine($"{ralli.Name} speed: {ralli.Speed}");
                            }
                        }
                        else
                        {
                            Console.WriteLine("Invalid input for slowing down speed.");
                        }
                    }
                }
                else
                {
                    Console.WriteLine("Invalid input. Quitting.");
                    break;
                }

                Console.Write("Do you want to accelerate (1) or slow (2) your car (any other key quits): ");
                userInput = Console.ReadLine();
            }

            Console.WriteLine("Ok bye.");
        }
    }
}
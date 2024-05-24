using System;

namespace T14
{

    public class Amplifier
    {
        public int Volume { get; set; }

        public int NewVolume(int change, out string message)
        {
            int newVolume;

            if (change > 0)
            {
               newVolume = Volume + change;

                if (newVolume > 100)
                {
                    message = "Too much volume - Amplifier volume is set to maximum: 100";
                    Volume = 0;
                }
                else
                {
                    Volume = newVolume;
                    message = $"Amplifier volume is set to: {Volume}";
                }

            } else if (change < 0)
            {
                newVolume = Volume + change;

                if (newVolume < 0)
                {
                    message = "Too low volume - Amplifier volume is set to minimum: 0";
                    Volume = 0;
                } else
                {
                    Volume = newVolume;
                    message = $"Amplifier volume is set to: {Volume}";
                }
            } else
            {
                message = "Invalid input.";
            }


            return Volume;
       
        }
    }

    internal class Program
    {
        static void Main(string[] args)
        {
            Amplifier amplifier = new();

            while (true)
            {
                Console.Write("Give a new volume value (0-100) > ");

                if (int.TryParse(Console.ReadLine(), out int change))
                {
                    amplifier.NewVolume(change, out string message);
                    Console.WriteLine($"-> {message}");
                }
                else
                {
                    Console.WriteLine("Invalid input. Please enter a valid volume value.");
                }
            }
        }
    }
}
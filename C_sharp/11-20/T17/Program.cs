using System;

namespace T17
{
    public class ElectricialDevice
    {
        public bool On { get; set; }
        public float Power { get; set; }
    }

    public class Radio : ElectricialDevice
    {
        public bool OnOff { get; set; }
        public int Volume { get; set; }
        public float Frequency { get; set; }

        public override string ToString()
        {
            return $"Electric Device: On: {OnOff} Power: {Power} | Radio: On: {OnOff} Volume: {Volume} Frequency: {Frequency}";
        }
    }

    internal class Program
    {
        static void Main(string[] args)
        {
            Radio radio = new Radio()
            {
                On = true,
                Power = 50.5f,
                OnOff = true,
                Volume = 5,
                Frequency = 2500
            };

            Console.WriteLine(radio);

            // Change these for testing
            radio.On = true;
            radio.OnOff = true;
            radio.Volume = 9;
            radio.Frequency = 2000.25f;

            if (!radio.On || !radio.OnOff)
            {
                Console.WriteLine("Turn the devices on.");
            } else if (radio.Volume < 0 || radio.Volume > 9)
            {
                Console.WriteLine("Volume between 0 - 9");
            } else if (radio.Frequency < 2000.0f || radio.Frequency > 26000.0f)
            {
                Console.WriteLine("Frequance between 2000.0 - 26000.0");
            } else
            {
                Console.WriteLine(radio);
            }
        }
    }
}
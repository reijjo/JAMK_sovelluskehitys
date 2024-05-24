using System;

namespace T16 // Note: actual namespace depends on the project name.
{
    public class Vehicle
    {
        public string? Name { get; set; }
        public string? Model { get; set; }
        public int ModelYear { get; set; }
        public string? Color { get; set; }
    }

    public class Bicycle : Vehicle
    {
        public bool GearWheels { get; set; }
        public string? GearName { get; set; }

        public override string ToString()
        {
            return $"- Name:{Name} Model:{Model} ModelYear:{ModelYear} Color:{Color} GearWheels:{GearWheels} Gear Name:{GearName}";
        }
    }

    public class Boat : Vehicle
    {
        public string? BoatType { get; set; }
        public int SeatCount { get; set; }

        public override string ToString()
        {
            return $"Name:{Name} Model:{Model} ModelYear:{ModelYear} Color:{Color} SeatCount:{SeatCount} BoatType:{BoatType}";
        }
    }

    internal class Program
    {
        static void Main(string[] args)
        {
            Bicycle bike1 = new()
            {
                Name = "Jopo",
                Model = "Street",
                ModelYear = 2016,
                Color = "Blue",
                GearWheels = false
            };

            Bicycle bike2 = new()
            {
                Name = "Tunturi",
                Model = "StreetPower",
                ModelYear = 2010,
                Color = "Black",
                GearWheels = true,
                GearName = "Shimano Nexus"
            };

            Boat boat1 = new()
            {
                Name = "SummerFun",
                Model = "S900",
                ModelYear = 1990,
                Color = "White",
                SeatCount = 3,
                BoatType = "Rowboat"
            };

            Boat boat2 = new()
            {
                Name = "Yamaha",
                Model = "1000",
                ModelYear = 2010,
                Color = "Yellow",
                SeatCount = 5,
                BoatType = "Motorboat"
            };

            Console.WriteLine("Bike1 info");
            Console.WriteLine(bike1);
            Console.WriteLine();

            Console.WriteLine("Bike1 info");
            Console.WriteLine(bike2);
            Console.WriteLine();

            Console.WriteLine("Boat  info");
            Console.WriteLine(boat1);
            Console.WriteLine();

            Console.WriteLine("Boat2 info");
            Console.WriteLine(boat2);
            Console.WriteLine();
        }
    }
}


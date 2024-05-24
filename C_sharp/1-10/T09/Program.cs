using System;
using System.Reflection;
using System.Runtime.ConstrainedExecution;

namespace T09 // Note: actual namespace depends on the project name.
{
    internal class Program
    {
        public class Vehicle
        {
            public string? Brand { get; set; }
            public string? Model { get; set; }
            public int Speed { get; set; }
            public int Tires { get; set; }

            public string ShowInfo()
            {
                return $"{Brand} {Model}";
            }

            public override string ToString()
            {
                return $"Brand: {Brand}, Model: {Model}, Speed: {Speed} km/h, Tires: {Tires}";
            }
        }

        static void Main(string[] args)
        {
            Vehicle auto = new()
            {
                Brand = "Audi",
                Model = "audimodel",
                Speed = 23,
                Tires = 4
            };

            Vehicle rekka = new()
            {
                Brand = "Scania",
                Model = "iso",
                Speed = 40,
                Tires = 8
            };

            Console.WriteLine("Alku info:");
            Console.WriteLine($"Auto: {auto.ShowInfo()}");
            Console.WriteLine($"Rekka: {rekka.ShowInfo()}");
            Console.WriteLine();

            auto.Speed = 108;
            rekka.Model = "isompi";

            Console.WriteLine("Updated Information:");
            Console.WriteLine(auto);
            Console.WriteLine(rekka);
        }
    }
}
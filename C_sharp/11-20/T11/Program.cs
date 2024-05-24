using System;
using System.Collections.Generic;

namespace T11 
{
    public class Song
    {
        public string? Name { get; set; }
        public string? Duration { get; set; }

        public Song(string name, string duration)
        {
            Name = name;
            Duration = duration;
        }

        public override string ToString()
        {
            return $"--- Name: {Name} - {Duration}";
        }
    }

    public class CD
    {
        public string? Artist { get; set; }
        public string? Name { get; set; }
        public string? Genre { get; set; }
        public string? Price { get; set; }
        public List<Song>? Songs { get; set; }

        public CD()
        {
            Songs = new List<Song>();
        }

        public override string ToString()
        {
            string cdInfo = $"CD:\n" +
                 $"- Artist: {Artist}\n" +
                 $"- Name: {Name}\n" +
                 $"- Genre: {Genre}\n" +
                 $"- Price: ${Price}\n" +
                 $"Songs:\n";

            if (Songs != null)
            {
                foreach (var song in Songs)
                {
                    cdInfo += song.ToString() + "\n";
                }
            }

            return cdInfo;
        }
    }

    internal class Program
    {
        static void Main(string[] args)
        {

            CD nightwish = new()
            {
                Artist = "Nightwish",
                Name = "Endless Forms Most Beautiful",
                Genre = "Symphonic metal",
                Price = "19.90",
                Songs = new List<Song>()
            };

            nightwish.Songs.Add(new Song("Shudder Before the Beautiful", "06:29"));
            nightwish.Songs.Add(new Song("Weak Fantasy", "05:23"));

            Console.WriteLine(nightwish);
        }
    }
}
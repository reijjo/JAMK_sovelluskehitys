using System;
using System.Collections.Generic;
using System.Linq;

namespace T21
{
    public class CD
    {
        public string? Name { get; set; }
        public string? Artist { get; set; }
        public int NumberOfSongs { get => Songs.Count; }
        public TimeSpan TotalLength { get => CalculateTotal();  }
        public List<Song> Songs { get; }

        public CD(string name, string artist, List<Song> songs)
        {
            Name = name;
            Artist = artist;
            Songs = songs;
           
        }

        private TimeSpan CalculateTotal()
        {
            double totalSeconds = Songs.Sum(song => song.Length.TotalSeconds);
            long totalTicks = (long)(totalSeconds * TimeSpan.TicksPerSecond);
            return TimeSpan.FromTicks(totalTicks);
        }



    }

    public class Song
    {
        public string? Title { get; }
        public TimeSpan Length { get; }

        public Song(string title, TimeSpan length)
        {
            Title = title;
            Length = length;
        }
    }

    internal class Program
    {
        static void Main(string[] args)
        {

            var songs = new List<Song>()
            {
                new Song("Shudder Before the Beautiful", TimeSpan.FromMinutes(6) + TimeSpan.FromSeconds(29)),
                new Song("Weak Fantasy", TimeSpan.FromMinutes(5) + TimeSpan.FromSeconds(23)),
            };

            var CD = new CD("Endless Forms Most Beautiful", "Nightwish", songs);

            int totalMin = (int)CD.TotalLength.TotalMinutes;
            int totalSec = CD.TotalLength.Seconds;


            Console.WriteLine("You have a CD:");
            Console.WriteLine($"name: {CD.Name}");
            Console.WriteLine($"artist: {CD.Artist}");
            Console.WriteLine($"total length: **{totalMin}min {totalSec}sec**");
            Console.WriteLine($"- {CD.NumberOfSongs} songs:");

            foreach (var song in CD.Songs)
            {
                int minutes = song.Length.Minutes;
                int seconds = song.Length.Seconds;
                Console.WriteLine($"  - {song.Title}, {minutes}:{seconds:D2}"); 
            }

        }
    }
}
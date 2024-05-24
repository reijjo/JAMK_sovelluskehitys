using System;
using System.Collections.Generic;

namespace T22
{
    public enum Suit
    {
        Heart,
        Diamond,
        Club,
        Spade
    }

    public enum Value
    {
        Ace,
        King,
        Queen,
        Jack,
        Ten,
        Nine,
        Eight,
        Seven,
        Six,
        Five,
        Four,
        Three,
        Two
    }

    public class Card
    {
        public Suit Suit { get; }
        public Value Value { get; }

        public Card(Suit suit, Value value)
        {
            Suit = suit;
            Value = value;
        }

        public override string ToString()
        {
            return $"{Value} of {Suit}s";
        }
    }

    public class CardDeck
    {
        private readonly List<Card> cards;
        private readonly Random random;

        public CardDeck()
        {
            cards = new List<Card>();
            InitializeDeck();
            random = new Random();
        }

        private void InitializeDeck()
        {
            foreach (Suit suit in Enum.GetValues(typeof(Suit)))
            {
                foreach (Value value in Enum.GetValues(typeof(Value)))
                {
                    cards.Add(new Card(suit, value));
                }
            }
        }

        public void Shuffle()
        {
            int n = cards.Count;
            while (n > 1)
            {
                n--;
                int k = random.Next(n + 1);
                (cards[n], cards[k]) = (cards[k], cards[n]);
            }
        }

        public void PrintDeck()
        {
            foreach (Card card in cards)
            {
                Console.WriteLine(card);
            }
        }
    }

    internal class Program
    {
        static void Main(string[] args)
        {
            CardDeck deck = new();

            Console.WriteLine("Kortit:");
            deck.PrintDeck();

            deck.Shuffle();

            Console.WriteLine("\nSekotetut:");
            deck.PrintDeck();
        }
    }
}

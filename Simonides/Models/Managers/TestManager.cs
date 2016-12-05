using System;
using System.Linq;

namespace Simonides.Models.Managers
{
    public interface ITestManager
    {
        TestModel CreateMultipleChoice(string deckId, int position, int choices);
        bool TestMultipleChoice(string deckId, int position, string cardCode);
    }

    public class TestManager : ITestManager
    {
        private IDecksManager _decksManager;

        public TestManager(IDecksManager decksManager)
        {
            _decksManager = decksManager;
        }

        public TestModel CreateMultipleChoice(string deckId, int position, int choices)
        {
            var deck = _decksManager.Get(deckId);

            var correctCard = deck[position];

            var random = new Random();
            var allCards = deck.Cards
                .Skip(position + 1)
                .OrderBy(x => random.NextDouble())
                .Take(choices - 1)
                .ToList();

            allCards.Add(correctCard);
            allCards = allCards.OrderBy(x => random.NextDouble()).ToList();

            return new TestModel
            {
                Cards = allCards,
                DeckId = deckId,
                Position = position
            };
        }

        public bool TestMultipleChoice(string deckId, int position, string cardCode)
        {
            return _decksManager.Get(deckId)[position].Code == cardCode;
        }
    }
}
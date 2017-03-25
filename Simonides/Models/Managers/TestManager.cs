using Simonides.Models.Enums;
using System;
using System.Linq;

namespace Simonides.Models.Managers
{
    public interface ITestManager
    {
        TestModel CreateMultipleChoice(string deckId, int position);
        bool TestMultipleChoice(string deckId, int position, string cardCode);
    }

    public class TestManager : ITestManager
    {
        private IDecksManager _decksManager;
        private TestDifficulty _testDifficulty;

        public TestManager(IDecksManager decksManager, TestDifficulty testDifficulty)
        {
            _decksManager = decksManager;
            _testDifficulty = testDifficulty;
        }

        public TestModel CreateMultipleChoice(string deckId, int position)
        {
            var deck = _decksManager.Get(deckId);

            var correctCard = deck[position];

            var random = new Random();
            var allCards = deck.Cards
                .Skip(position + 1)
                .OrderBy(x => random.NextDouble())
                .Take(GetNumberOfChoices() - 1)
                .ToList();

            allCards.Add(correctCard);
            allCards = allCards.OrderBy(x => random.NextDouble()).ToList();

            return new TestModel
            {
                Cards = allCards,
                DeckId = deckId,
                Position = position,
                Difficulty = _testDifficulty
            };
        }

        public bool TestMultipleChoice(string deckId, int position, string cardCode)
        {
            return _decksManager.Get(deckId)[position].Code == cardCode;
        }

        private int GetNumberOfChoices()
        {
            switch (_testDifficulty)
            {
                case TestDifficulty.ChoiceOf4:
                    return 4;
                case TestDifficulty.ChoiceOf2:
                    return 2;
                case TestDifficulty.ChoiceFromAllRemaining:
                    return 52;
                default:
                    return -1;
            }
        }
    }
}
using System.Collections.Generic;

namespace Simonides.Models
{
    public class TestModel
    {
        public IList<CardModel> Cards { get; set; }
        public string DeckId { get; set; }
        public int Position { get; set; }
    }
}

using System.Collections.Generic;

namespace Simonides.Models
{
    public class DeckModel
    {
        public IEnumerable<CardModel> Cards { get; set; }
        public int Remaining { get; set; }
        public bool Success { get; set; }
        private string DeckId { get; set; }
    }
}

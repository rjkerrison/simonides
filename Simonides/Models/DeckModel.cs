using Newtonsoft.Json;
using System.Collections.Generic;

namespace Simonides.Models
{
    public class DeckModel
    {
        public IList<CardModel> Cards { get; set; }
        public int Remaining { get; set; }
        public bool Success { get; set; }

        [JsonProperty("deck_id")]
        public string DeckId { get; set; }

        public CardModel this[int index] {
            get
            {
                return Cards[index];
            } 
        }
    }
}

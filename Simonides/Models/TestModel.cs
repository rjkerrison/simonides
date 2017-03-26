using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Simonides.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Simonides.Models
{
    public class TestModel
    {
        public IList<CardModel> Cards { get; set; }
        public string DeckId { get; set; }
        public int Position { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public TestDifficulty Difficulty { get; set; }

        public IEnumerable<string> AvailableDifficulties
        {
            get
            {
                return Enum.GetValues(typeof(TestDifficulty))
                    .Cast<TestDifficulty>()
                    .Select(x => x.ToString());
            }
        }
    }
}

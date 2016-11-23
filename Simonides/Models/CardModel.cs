using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Simonides.Models
{
    public class CardModel
    {
        public ImageModel Images { get; set; }
        public string Value { get; set; }
        public string Suit { get; set; }
        public string Code { get; set; }
        public string Image { get; set; }

    }

    public class ImageModel
    {
        public string Svg { get; set; }
        public string Png { get; set; }
    }
}

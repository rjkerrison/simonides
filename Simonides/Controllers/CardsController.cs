using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Simonides.Models;
using Simonides.Models.Helpers;

namespace Simonides.Controllers
{
    public class CardsController : Controller
    {
        private Uri NewDeck = new Uri("https://deckofcardsapi.com/api/deck/new/draw/?count=52");

        // GET: Cards
        public ActionResult Index()
        {
            string newDeckJson;

            if (WebRequester.TryMakeRequest(NewDeck, out newDeckJson))
            {
                var model = JsonConvert.DeserializeObject<DeckModel>(newDeckJson);

                return View(model);
            }

            return RedirectToAction("Error");
        }

        public ActionResult Error()
        {
            throw new NotImplementedException("I'll do this later");
        }

    }
}
using System;
using System.Web.Mvc;
using Simonides.Models;
using Simonides.Models.Managers;

namespace Simonides.Controllers
{
    public class CardsController : Controller
    {
        private IDecksManager _decksManager = new DecksManager();

        // GET: Cards
        public ActionResult New()
        {
            var deck = _decksManager.Create();

            if (deck != null)
            {
                return RedirectToAction("Show", new {
                    @id = deck.DeckId
                });
            }

            return RedirectToAction("Error");
        }

        public ActionResult Index()
        {
            var deckModels = _decksManager.GetAll();
            return View(deckModels);
        }

        public ActionResult Test(string id)
        {
            var deck = _decksManager.Get(id);
            if (deck != null)
            {
                var model = new TestModel
                {
                    Deck = deck,
                    Position = 0
                };

                return View(model);
            }
            return RedirectToAction("Error");
        }

        public ActionResult Show(string id)
        {
            var deck = _decksManager.Get(id);
            if (deck != null)
            {
                return View(deck);
            }
            return RedirectToAction("Error");
        }

        public PartialViewResult TestCard(TestModel testModel)
        {
            return PartialView(testModel.Deck.Cards[testModel.Position]);
        }

        public ActionResult Error()
        {
            throw new NotImplementedException("I'll do this later");
        }

        public JsonResult NextTestCard(string id, int position)
        {
            var deck = _decksManager.Get(id);
            if (deck != null)
            {
                return Json(new
                {
                    result = new
                    {
                        imagesrc = deck.Cards[position].Image,
                        cardcode = deck.Cards[position].Code
                    }
                },
                JsonRequestBehavior.AllowGet);
            }

            return Json(new { result = "Hello World From ReactJS Controller" }, JsonRequestBehavior.AllowGet);
        }
    }
}
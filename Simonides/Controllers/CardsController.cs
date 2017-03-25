using System;
using System.Web.Mvc;
using Simonides.Models.Managers;
using Simonides.Models.Enums;

namespace Simonides.Controllers
{
    public class CardsController : Controller
    {
        private IDecksManager _decksManager = new DecksManager();
        private ITestManager _testManager;

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

        public ActionResult Test(string id, TestDifficulty difficulty)
        {
            if (_testManager == null)
            {
                _testManager = new TestManager(_decksManager, difficulty);
            }

            var model = _testManager.CreateMultipleChoice(id, 0);

            return View(model);
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

        public ActionResult Error()
        {
            throw new NotImplementedException("I'll do this later");
        }

        public JsonResult TestCard(string id, int position, string cardCode, TestDifficulty difficulty)
        {
            if (_testManager == null)
            {
                _testManager = new TestManager(_decksManager, difficulty);
            }

            if (_testManager.TestMultipleChoice(id, position, cardCode))
            {
                if (position == 51)
                {
                    return Json(new { result = new {
                        success = true,
                        deckComplete = true
                    } }, JsonRequestBehavior.AllowGet);
                }

                var test = _testManager.CreateMultipleChoice(id, position + 1);

                return Json(new {
                    result = new
                    {
                        success = true,
                        deckComplete = false,
                        test = test
                    }
                }, 
                JsonRequestBehavior.AllowGet);
            }

            return Json(new { result = new {
                success = false,
            }
            }, JsonRequestBehavior.AllowGet);
        }
    }
}
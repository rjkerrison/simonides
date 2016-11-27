using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using Simonides.Models.Helpers;
using Newtonsoft.Json;

namespace Simonides.Models.Managers
{
    public interface IDecksManager
    {
        DeckModel Create();
        IEnumerable<DeckModel> GetAll();
        DeckModel Get(string id);
    }

    public class DecksManager : IDecksManager
    {
        private Uri NewDeck = new Uri("https://deckofcardsapi.com/api/deck/new/draw/?count=52");
        private string DecksPath = ConfigurationManager.AppSettings["DecksPath"];

        public DeckModel Create()
        {
            string newDeckJson;

            if (WebRequester.TryMakeRequest(NewDeck, out newDeckJson))
            {
                var model = JsonConvert.DeserializeObject<DeckModel>(newDeckJson);

                File.WriteAllText(
                    Path.Combine(DecksPath, $@"{model.DeckId}.json"),
                    newDeckJson);

                return model;
            }

            return null;
        }

        public DeckModel Get(string id)
        {
            DeckModel deck;
            if (TryGetDeckFromJson(id, out deck))
            {
                return deck;
            }
            return null;
        }

        public IEnumerable<DeckModel> GetAll()
        {
            if (!Directory.Exists(DecksPath))
            {
                Directory.CreateDirectory(DecksPath);
            }

            var filepaths = Directory.EnumerateFiles(DecksPath);

            IList<DeckModel> deckModels = new List<DeckModel>();

            foreach (var filepath in filepaths)
            {
                var model = CreateDeckModelFromJson(filepath);
                yield return model;
            }
        }

        private bool TryGetDeckFromJson(string id, out DeckModel model)
        {
            var filepath = Path.Combine(DecksPath, $@"{id}.json");

            if (System.IO.File.Exists(filepath))
            {
                model = CreateDeckModelFromJson(filepath);
                return true;
            }
            else
            {
                model = null;
                return false;
            }
        }

        private DeckModel CreateDeckModelFromJson(string filepath)
        {
            string jsonString;
            using (var fileStream = File.Open(filepath, FileMode.Open))
            using (var streamReader = new StreamReader(fileStream))
            {
                jsonString = streamReader.ReadToEnd();
            }

            return JsonConvert.DeserializeObject<DeckModel>(jsonString);
        }
    }
}
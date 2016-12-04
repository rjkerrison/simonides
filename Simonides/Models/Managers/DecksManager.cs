using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using Simonides.Models.Helpers;
using Newtonsoft.Json;

namespace Simonides.Models.Managers
{
    public interface IDecksManager
    {
        DeckModel Create();
        IList<DeckModel> GetAll();
        DeckModel Get(string id);
    }

    public class DecksManager : IDecksManager
    {
        private readonly Uri _newDeck = new Uri("https://deckofcardsapi.com/api/deck/new/draw/?count=52");
        private readonly string _decksPath = ConfigurationManager.AppSettings["DecksPath"];

        public DeckModel Create()
        {
            string newDeckJson;

            if (WebRequester.TryMakeRequest(_newDeck, out newDeckJson))
            {
                var model = JsonConvert.DeserializeObject<DeckModel>(newDeckJson);

                File.WriteAllText(
                    Path.Combine(_decksPath, $@"{model.DeckId}.json"),
                    newDeckJson);

                return model;
            }

            return null;
        }

        public DeckModel Get(string id)
        {
            DeckModel deck;
            return TryGetDeckFromJson(id, out deck) ? deck : null;
        }

        public IList<DeckModel> GetAll()
        {
            if (!Directory.Exists(_decksPath))
            {
                Directory.CreateDirectory(_decksPath);
            }

            var filepaths = Directory.EnumerateFiles(_decksPath);

            return filepaths.Select(CreateDeckModelFromJson).ToList();
        }

        private bool TryGetDeckFromJson(string id, out DeckModel model)
        {
            var filepath = Path.Combine(_decksPath, $@"{id}.json");

            if (File.Exists(filepath))
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

        private static DeckModel CreateDeckModelFromJson(string filepath)
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
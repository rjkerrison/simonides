using System;
using System.IO;
using System.Net;

namespace Simonides.Models.Helpers
{
    class WebRequester
    {
        public static bool TryMakeRequest(Uri uri, out string responseData)
        {
            try
            {
                var request = WebRequest.Create(uri);
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                var response = request.GetResponse();
                var data = response.GetResponseStream();

                using (var sr = new StreamReader(data))
                {
                    responseData = sr.ReadToEnd();
                }

                return true;
            }
            catch (WebException ex)
            {
                Console.WriteLine(ex.Message);
                responseData = null;
                return false;
            }
        }
    }
}

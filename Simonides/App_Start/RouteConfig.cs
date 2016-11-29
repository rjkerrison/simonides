using System.Web.Mvc;
using System.Web.Routing;

namespace Simonides
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Position",
                url: "{controller}/{action}/{id}/{position}",
                defaults: new { controller = "Cards", action = "Index", id = UrlParameter.Optional, position = 0 }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Cards", action = "Index", id = UrlParameter.Optional, position = 0 }
            );
        }
    }
}

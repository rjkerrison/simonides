using System.Web.Optimization;
using System.Web.Optimization.React;

namespace Simonides
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new BabelBundle("~/bundles/react").Include(
                "~/Content/Cards.jsx"
            ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/site.css"));

            BundleTable.EnableOptimizations = true;
        }
    }
}

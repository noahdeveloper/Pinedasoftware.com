using System.Web;
using System.Web.Optimization;

namespace PinedaSoftware
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            //CSS: theme and custom
            bundles.Add(new StyleBundle("~/bundles/styles").Include(
                "~/Content/css/freelancer.css",
                "~/Content/css/custom.css"));
            
            //jQuery
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Content/Scripts/jquery.min.js",
                        "~/Content/Scripts/jquery.easing.min.js"));

            //jQuery: validation
            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Content/Scripts/jquery.validate*"));

            //JS: bootstrap
            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Content/Scripts/bootstrap.bundle.min.js"));

            //JS: custom
            bundles.Add(new ScriptBundle("~/bundles/customJS").Include(
                "~/Content/Scripts/custom.js"));

            //JS: index page
            bundles.Add(new ScriptBundle("~/bundles/landingPage").Include(
                "~/Content/Scripts/pages/home_index.js"));

            //JS: contant and phonemask
            bundles.Add(new ScriptBundle("~/bundles/contact").Include(
                "~/Content/Scripts/contact_me.js",
                "~/Content/Scripts/contact.js",
                "~/Content/Scripts/phonemask.js"));

            //JS: 's' for 'security'. Purposely given unintuitive name for security purposes
            bundles.Add(new ScriptBundle("~/bundles/s").Include(
                "~/Content/Scripts/s.js"));
        }
    }
}

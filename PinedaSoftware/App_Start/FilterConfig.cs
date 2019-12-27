using System.Web;
using System.Web.Mvc;
using PinedaSoftware.Common.Filters;

namespace PinedaSoftware
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new RequestHandler());
        }
    }
}

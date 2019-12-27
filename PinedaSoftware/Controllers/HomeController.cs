using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PinedaSoftware.Controllers
{
    /// <summary>
    /// Controller used for Pinedasoftware landing page.
    /// </summary>
    public class HomeController : Controller
    {
        /// <summary>
        /// Landing page action.
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            //Set viewbag values from web.config for urls. TODO: replace viewbags with view model?
            ViewBag.Url_StackOverflow = ConfigurationManager.AppSettings["StackOverflow"];
            ViewBag.Url_LinkedIn = ConfigurationManager.AppSettings["LinkedIn"];
            ViewBag.Url_GitHub = ConfigurationManager.AppSettings["GitHub"];

            return View();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PinedaSoftware.Models;

namespace PinedaSoftware.Common.Filters
{
    public class RequestHandler  : ActionFilterAttribute
    {
        /// <summary>
        /// Sets session variable 'RequestModel' as RequestModel with current HttpContext information. 
        /// </summary>
        /// <param name="filterContext"></param>
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var request = new RequestModel();
            request.DateTime = filterContext.HttpContext.Timestamp;
            request.IpAddress = filterContext.HttpContext.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] ??
                                filterContext.HttpContext.Request.ServerVariables["REMOTE_ADDR"];

            request.Browser = filterContext.HttpContext.Request.Browser.Browser;
            request.BrowserVersion = filterContext.HttpContext.Request.Browser.Version;

            request.IsMobileDevice = filterContext.HttpContext.Request.Browser.IsMobileDevice;
            request.MobileInformation = (request.IsMobileDevice
                ? $"Mobile manufacturer: {filterContext.HttpContext.Request.Browser.MobileDeviceManufacturer}. " +
                  $"Mobile model: {filterContext.HttpContext.Request.Browser.MobileDeviceModel}."
                : string.Empty);

            HttpContext.Current.Session["RequestModel"] = request;
        }
    }
}
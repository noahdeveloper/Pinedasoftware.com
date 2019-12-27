using PinedaSoftware.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PinedaSoftware.Helper
{
    /// <summary>
    /// Static helper class used for general purposes.
    /// </summary>
    public static class GlobalHelper
    {
        /// <summary>
        /// Get 'RequestModel' session variable.
        /// </summary>
        /// <returns></returns>
        public static RequestModel GetRequestModel()
        {
            var request = new RequestModel();
            request = HttpContext.Current.Session["RequestModel"] as RequestModel;

            if (request.GetType() != typeof(RequestModel))
                return null;

            return request;
        }
    }
}
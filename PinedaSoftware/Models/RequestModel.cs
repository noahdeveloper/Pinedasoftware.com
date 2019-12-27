using PinedaSoftware.Common.ModelBinders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PinedaSoftware.Models
{
    /// <summary>
    /// Classs used to model an HTTP context request.
    /// </summary>
    [ModelBinder(typeof (TrimModelBinder))]
    public class RequestModel
    {
        public DateTime DateTime { get; set; }
        public string IpAddress { get; set; }
        public string Browser { get; set; }
        public string BrowserVersion { get; set; }
        public bool IsMobileDevice { get; set; }
        public string MobileInformation { get; set; }
    }
}
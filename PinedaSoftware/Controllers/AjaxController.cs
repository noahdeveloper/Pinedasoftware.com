using PinedaSoftware.Helper;
using PinedaSoftware.Models;
using System.Web.Mvc;

namespace PinedaSoftware.Controllers
{
    /// <summary>
    /// Controller for Ajax actions only.
    /// </summary>
    public class AjaxController : Controller
    {
        #region Contant Email

        /// <summary>
        /// Sends email with 'Contact Me' form values using SMTP.
        /// </summary>
        /// <param name="model">'Contact Me' form object.</param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult ContantEmail(ContactModel model)
        {
            //Bot trap
            if (!string.IsNullOrEmpty(model.Username))
                return new HttpStatusCodeResult(200);

            if(!ModelState.IsValid)
                return new HttpStatusCodeResult(400);

            if (!EmailHelper.SendEmail(model))
                return new HttpStatusCodeResult(500);

            return new HttpStatusCodeResult(200);
        }
        #endregion Contant Email
    }
}
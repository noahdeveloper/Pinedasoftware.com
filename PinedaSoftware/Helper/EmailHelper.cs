using PinedaSoftware.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;


namespace PinedaSoftware.Helper
{
    /// <summary>
    /// Static helper class with email related logic only.
    /// </summary>
    public static class EmailHelper
    {
        /// <summary>
        /// Sends email using SMTP.
        /// </summary>
        /// <param name="contantModel">'Contanct Me' form values as object.</param>
        /// <returns></returns>
        public static bool SendEmail(ContactModel contantModel)
        {
            var emailSent = true;

            try
            {
                //Set object instances for SMTP client, request, and email classes.
                var smtpClient = new SmtpClient();
                var request = GlobalHelper.GetRequestModel();
                var email = new MailMessage();

                email.IsBodyHtml = true;

                //Email configuration from web.config file.
                var fromEmail = ConfigurationManager.AppSettings["SmtpFromAddress"];
                var appName = ConfigurationManager.AppSettings["AppName"];

                email.From = new MailAddress(fromEmail);

                //Set list of email addresses to send email to.
                var toAddressesValue = ConfigurationManager.AppSettings["ToAddresses"];
                var toAddressesList = ConfigurationManager.AppSettings["ToAddresses"].Split(';').ToList();
                foreach(var toAddress in toAddressesList)
                    if(!string.IsNullOrWhiteSpace(toAddress))
                        email.To.Add(toAddress);
                
                //Set email subject.
                email.Subject = ConfigurationManager.AppSettings["ContactMeEmailSubject"]
                    .Replace("[appName]", appName)
                    .Replace("[name]", contantModel.Name);

                //Set email body.
                email.Body = ConfigurationManager.AppSettings["ContactMeEmailMessage"]
                    .Replace("[name]", contantModel.Name)
                    .Replace("[email]", contantModel.Email)
                    .Replace("[phone]", contantModel.Phone ?? "N/A")
                    .Replace("[message]", contantModel.Message)
                    .Replace("[fromEmail]", fromEmail)
                    .Replace("[appName]", appName)
                    .Replace("[datetime]", request.DateTime.ToString())
                    .Replace("[ipAddress]", request.IpAddress)
                    .Replace("[browser]", request.Browser)
                    .Replace("[browserVersion]", request.BrowserVersion)
                    .Replace("[isMobileDevice]", (request.IsMobileDevice ? "Yes" : "No"))
                    .Replace("[mobileInfo]", request.MobileInformation ?? "N/A");

                //Send email
                smtpClient.Send(email);
            }
            catch (Exception ex)
            {
                //TODO: Log exception?
                emailSent = false;
            }

            return emailSent;
        }
    }
}
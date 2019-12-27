using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using PinedaSoftware.Common.ModelBinders;

namespace PinedaSoftware.Models
{
    /// <summary>
    /// Class used to model 'Contanct Me' form values.
    /// </summary>
    [ModelBinder(typeof(TrimModelBinder))]
    public class ContactModel
    {
        [Required]
        [DisplayName("Name")]
        [MaxLength(20, ErrorMessage = "Max length of 20")]
        public string Name { get; set; }

        [Required]
        [DisplayName("Email")]
        [EmailAddress]
        [MaxLength(35, ErrorMessage = "Max length of 35")]
        public string Email { get; set; }

        [DisplayName("Phone")]
        [Phone]
        [MaxLength(13, ErrorMessage = "Max length of 13")]
        public string Phone { get; set; }
        
        [Required]
        [DisplayName("Message")]
        [MaxLength(250, ErrorMessage = "Max length of 250")]
        public string Message { get; set; }

        [MaxLength(10)]
        public string Username { get; set; }
    }
}
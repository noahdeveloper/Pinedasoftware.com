using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PinedaSoftware.Common.ModelBinders
{
    /// <summary>
    /// Model binder that will trim strings before binding the value to string properties.
    /// </summary>
    public class TrimModelBinder : DefaultModelBinder
    {
        protected override void SetProperty(ControllerContext controllerContext, 
            ModelBindingContext bindingContext, PropertyDescriptor propertyDescriptor, object value)
        {
            if (propertyDescriptor.PropertyType == typeof(string))
            {
                var stringValue = (string)value;
                value = !string.IsNullOrWhiteSpace(stringValue) ? stringValue.Trim() : null;
            }
            
            base.SetProperty(controllerContext, bindingContext, propertyDescriptor, value);
        }
    }
}
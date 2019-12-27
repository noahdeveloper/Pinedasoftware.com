/**
 * Summary:
 * Index page 'Contact Me' form.
 *
 * Description:
 * Performs 'Contact Me' logic.
 *
 * @link   N/A
 * @author Noe Pineda.
 * @since  1.0.0
 */

$(document).ready(function () {
    /**
     * Page Settings
     */

    var $settings = $("#settings");
    var pageSettings = {
        ContantUrl: $settings.data("url-contant"),
        MaxMessageLength: 250
    };




    /**
     * Page Load
     */

    //If email was already sent (using cookie).
    emailSentLogic();

    //Phone mask
    $("#phone").mask("(999)999-9999");
    
    //Submit button status 
    submitButtonStatus();




    /**
     * Dynamic
     */
    $("#contactForm").keyup(function () {
        submitButtonStatus();
    });

    $("#name").change(function () {
        nameValidation();
    });

    $("#email").change(function () {
        emailValidation();
    });

    $("#phone").change(function () {
        phoneValidation();
    });

    $("#message").keyup(function() {
        messageCharacterCounter(pageSettings);
    });

    $("#sendMessageButton").click(function () {
        displayRequireFieldsError();
        submitButtonStatus();
        sendMessageButton("sending");
        sendEmail(pageSettings);
    });

    $("#sendMessageButtonDisabled").click(function () {
        displayRequireFieldsError();
    });
});

/**
 * Send email with 'Contact Me' form information.
 * @param {any} pageSettings Object which contains page settings as attributes.
 */
function sendEmail(pageSettings) {
    var firstName = $("#name").val();
    if (firstName.indexOf(' ') >= 0) {
        firstName = firstName.split(' ')[0];
    }
    
    $.ajax({
        url: pageSettings.ContantUrl,
        type: 'POST',
        data: $("#contactForm").serialize(),
        success: function () {
            //set cookie
            setCookieInHours("contanctEmail", firstName, 12);

            //reset submit button
            sendMessageButton("sent");

            //form/message
            contactFormSubmitted(200, firstName);

            //clear all fields
            $('#contactForm').trigger("reset");
        },
        error: function (jqXHR) {
            var httpResponseCode = jqXHR.status;

            //reset submit button
            sendMessageButton("sent");

            //form/message
            contactFormSubmitted(httpResponseCode, firstName);

            if (httpResponseCode !== 400) {
                //clear all fields
                $('#contactForm').trigger("reset");
            }
        }
    });
}

/**
 * 'Contant Me' form's 'name' validation logic.
 */
function nameValidation() {
    var value = $("#name").val();

    $("#name-validation-message-list").html("");

    if (isNullEmptyOrSpaces(value)) {
        return;
    }

    var isValid = nameIsValid(value);
    if (!isValid) {
        $("#name-validation-message-list").append("<li>Name is not valid.</li>");
    }
}

/**
 * Validate name value
 * @param {string} value 'Contact Me' form's 'name'.
 * @return {boolean} isValid The result.
 */
function nameIsValid(value) {
    var isValid = false;

    if (!isNullEmptyOrSpaces(value) && isAlphaOrSpace(value)) {
        isValid = true;
    }
    
    return isValid;
}

/**
 * 'Contant Me' form's 'email' validation logic.
 */
function emailValidation() {
    var value = $("#email").val();

    $("#email-validation-message-list").html("");

    if (isNullEmptyOrSpaces(value)) {
        return;
    }

    var isValid = emailIsValid(value);
    if (!isValid) {
        $("#email-validation-message-list").append("<li>Email address is not valid.</li>");
    }
}

/**
 * Validate email value
 * @param {string} value 'Contact Me' form's 'email'.
 * @return {boolean} isValid The result.
 */
function emailIsValid(value) {
    value = value.trim();

    var isValid = false;

    if (!isNullEmptyOrSpaces(value)) {
        var containsAtSign = false;
        var containsDot = false;
        var containsInvalidChar = false;

        for (var i = 0; i < value.length; i++) {
            if (value[i] === "@") {
                containsAtSign = true;
            }
            else if (value[i] === ".") {
                containsDot = true;
            }
            else if (value[i] === ";" || value[i] === "," || value[i] === " ") {
                containsInvalidChar = true;
            }
        }

        if (containsAtSign && containsDot && !containsInvalidChar) {
            isValid = true;
        }
    }
    
    return isValid;
}

/**
 * 'Contant Me' form's 'phone' validation logic.
 */
function phoneValidation() {
    var value = $("#phone").val();

    $("#phone-validation-message-list").html("");

    if (isNullEmptyOrSpaces(value)) {
        return;
    }

    var isValid = phoneIsValid(value);
    if (!isValid) {
        $("#phone-validation-message-list").append("<li>Phone number is not valid.</li>");
    }
}

/**
 * Validate phone value. If empty, then valid since not a required field.
 * @param {string} value 'Contact Me' form's 'phone'.
 * @return {boolean} isValid The result.
 */
function phoneIsValid(value) {
    value = value.replace("-", "");
    value = value.replace("(", "");
    value = value.replace(")", "");

    var isValid = false;

    if (isNullEmptyOrSpaces(value)) {
        isValid = true;
    }
    else if (/^\d+$/.test(value) && value.length === 10) {
        isValid = true;
    }

    return isValid;
}

/**
 * Validate message value.
 * @param {string} value 'Contact Me' form's 'message'.
 * @return {boolean} isValid The result.
 */
function messageIsValid(value) {
    return !isNullEmptyOrSpaces(value);
} 

/**
 * Set 'Contact Me' form 'message' field character counter.
 * @param {any} pageSettings Object which contains page settings as attributes.
 */
function messageCharacterCounter(pageSettings) {

    var value = $("#message").val();
    var length = value.length;
    var max = pageSettings.MaxMessageLength;
    var difference = max - length;
    var message = "";

    if (!isNullEmptyOrSpaces(value)) {
        if (difference <= 0) {
            message = "Thank you!";
        }
        else if (difference <= 15) {
            message = "Almost there. " + difference + " characters left...";
        }
        else {
            message = difference + " characters left...";
        }
    }
    
    $("#message-charactersleft-counter").html(message);
}

/**
 *'Contact Me' form 'submit' button status logic.
 */
function submitButtonStatus() {
    var validName = nameIsValid($("#name").val());
    var validEmail = emailIsValid($("#email").val());
    var validPhone = phoneIsValid($("#phone").val());
    var validMessage = messageIsValid($("#message").val());
    
    if (validName && validEmail && validPhone && validMessage) {
        $("#sendMessageButtonDisabled").hide();
        $("#sendMessageButton").show();
    }
    else {
        $("#sendMessageButtonDisabled").show();
        $("#sendMessageButton").hide();
    }
}

/**
 * Prevent event default action.
 * @param {any} event Page event.
 * @return {boolean} false. 
 */
function preventSubmit(event) {
    event.preventDefault();
    return false;
}

/**
 *'Contact Me' form 'submit' button status
 * @param {string} status Form submission status
 */
function sendMessageButton(status) {
    if (status === "sending") {
        $("#sendMessageButton").prop("disabled", true);
        $("#sendMessageButton").html("<span class=\"spinner-border spinner-border-sm\" " +
            "role=\"status\" aria-hidden=\"true\"></span>&nbsp;&nbsp;Sending...");
    }
    else if (status === "sent") {
        $("#sendMessageButton").prop("disabled", false);
        $("#sendMessageButton").html("Send Message");
        submitButtonStatus();
    }
}

/**
 * 'Contact Me' form submission logic.
 * @param {any} httpStatusCode Status code recieved from email sending HTTPS post request.
 * @param {any} firstName First name of email sender.
 */
function contactFormSubmitted(httpStatusCode, firstName) {
    var html = "";

    if (httpStatusCode === 200) {
        html =
        "<div class='alert alert-success'>" +
        "<strong>" + firstName + ", your message has been sent. Thank you!</strong>" +
        "</div>";

        $("#contactForm").hide();
        $("#contactFormSubmitted").html(html);
    }
    else if (httpStatusCode === 400) {
        html =
        "<div class='alert alert-warning'>" +
            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button><strong>Sorry " + firstName + ", but your request is invalid. Please try again after updating form.</strong>" +
        "</div>";

        $("#contactFormTryAgain").html(html);
    }
    else {
        html =
        "<div class='alert alert-danger'>" +
            "<strong>Sorry " + firstName + ", but there was an issue and your message was not sent. Please try again later.</strong>" +
        "</div>";

        $("#contactForm").hide();
        $("#contactFormSubmitted").html(html);
    }
}

/**
 * Page logic if 'Contact Me' form has already been submitted 
 */
function emailSentLogic() {
    var cookieValue = getCookieValue("contanctEmail");

    if (isNullEmptyOrSpaces(cookieValue)) {
        $("#contactForm").show();
        $("#contactFormSubmitted").html("");
    }
    else {
        $("#contactForm").hide();

        var html =
            "<div class='alert alert-info'>" +
                "<strong>" + cookieValue + ", it looks like you've already sent me a message. " +
                "Please wait before sending me another.</strong>" +
            "</div>";

        $("#contactFormSubmitted").html(html);
    }
}

/**
 * 'Contact Me' field 'required' error logic.
 */
function displayRequireFieldsError() {
   
    var name = $("#name").val();
    if (isNullEmptyOrSpaces(name)) {

        var ignoreName = $("#name-validation-message-list:has(li)").length > 0 ? true : false;
        if (!ignoreName) {
            $("#name-validation-message-list").append("<li>Name is required.</li>");
        }
    } 

    var email = $("#email").val();
    if (isNullEmptyOrSpaces(email)) {

        var ignoreEmail = $("#email-validation-message-list:has(li)").length > 0 ? true : false;
        if (!ignoreEmail) {
            $("#email-validation-message-list").append("<li>Email is required.</li>");
        }
    }

    var message = $("#message").val();
    if (isNullEmptyOrSpaces(message)) {

        var ignoreMessage = $("#message-validation-message-list:has(li)").length > 0 ? true : false;
        if (!ignoreMessage) {
            $("#message-validation-message-list").append("<li>Message is required.</li>");
        }
    }
}
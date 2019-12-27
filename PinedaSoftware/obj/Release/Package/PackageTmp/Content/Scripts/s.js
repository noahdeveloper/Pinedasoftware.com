/**
 * Summary:
 * N/A (for security reasons)
 *
 * Description:
 * N/A (for security reasons)
 *
 * @link   N/A
 * @author Noe Pineda.
 * @since  1.0.0
 */

/**
 * Sets cookie
 * @param {any} name Name of the cookie.
 * @param {any} value Value of the cookie.
 * @param {any} hours Hours (from creation time) in which cookie will expire. 
 */
function setCookieInHours(name, value, hours) {
    if (isNullEmptyOrSpaces(name) ||
        isNullEmptyOrSpaces(value) ||
        hours <= 0) {
        return;
    }
    var expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + hours);

    document.cookie = name + "=" + value +
        "; expires=" + expirationDate.toUTCString() + "path=/";
}

/**
 * Gets cookie
 * @param {string} cname Name of cookie to look for and get if it exists.
 * @return {string} Cookie Name.
 */
function getCookieValue(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
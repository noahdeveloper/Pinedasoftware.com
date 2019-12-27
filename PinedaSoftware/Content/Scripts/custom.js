/**
 * Summary:
 * Generic JS.
 *
 * Description:
 * JS functions found here are for general purpose.
 *
 * @link   N/A
 * @author Noe Pineda.
 * @since  1.0.0
 */

/**
 * Check of input is null, empty or spaces.
 * @param {any} input Value to check.
 * @return {boolean} Result.
 */
function isNullEmptyOrSpaces(input) {
    return input === null || input.match(/^ *$/) !== null;
}

/**
 * Check if input only contains alphabet characters (upper or lower) or spaces only.
 * @param {any} input Value to check.
 * @return {boolean} Result.
 */
function isAlphaOrSpace(input) {
    var regex = /^[a-zA-Z\s]+$/;
    return regex.test(input);
}

/**
 * Summary:
 * Index page button links
 *
 * Description:
 * On button open new browser tab with new URL.
 *
 * @link   N/A
 * @author Noe Pineda.
 * @since  1.0.0
 */

$(document).ready(function () {
    $("#github_button").click(function () {
        var stackoverflow_url = 'https://github.com/noahdeveloper';
        window.open(stackoverflow_url, '_blank');
    });

    $("#linkedin_button").click(function () {
        var stackoverflow_url = 'https://www.linkedin.com/in/noe-pineda-803124108';
        window.open(stackoverflow_url, '_blank');
    });

    $("#stackoverflow_button").click(function () {
        var stackoverflow_url = 'https://stackoverflow.com/users/7040242/npineda';
        window.open(stackoverflow_url, '_blank');
    });
});


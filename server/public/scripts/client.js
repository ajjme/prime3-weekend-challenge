$(document).ready(start);

function start() {
    console.log('jq srced');

    $.ajax({
        type: 'GET',
        url: '/main',
        success: function(response) {
            console.log('response', response);
        },
        error: function (err) {
            console.log('err', err);
        }
    });
}
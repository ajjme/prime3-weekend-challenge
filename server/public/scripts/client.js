$(document).ready(start);

function start() {
    console.log('jq srced');

    getList();
}

function getList() {
    $.ajax({
        type: 'GET',
        url: '/list',
        success: function(response) {
            console.log('response', response);
            showList(response);
        },
        error: function (err) {
            console.log('err', err);
        }
    });
}

function showList(list) {
    let newTable = $('<table>');
    let header = $('<tr><th>Status</th><th>Description</th><th>Actions</th></tr>');
    newTable.append(header);
    for (let i = 0; i < list.length; i++) {
        let newRow = $(`<tr><td>x</td><td>${list[i].content}</td><td><button>Delete</button></td></tr>`);
        newTable.append(newRow);
    }
    $('main').empty();
    $('main').append(newTable);
}
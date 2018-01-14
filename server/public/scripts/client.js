$(document).ready(start);

function start() {
    console.log('jq srced');

    getList();

   $('main').on('click', '.delete', deleteItem);
}

function deleteItem() {
    let thisId = $(this).closest('tr').data('id');
    $.ajax({
        type: 'DELETE',
        url: '/list/' + thisId,
        success: function(response) {
            console.log(response);
            getList();
        },
        error: function(error) {
            console.log(error);
        }
    });
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
    let newTable = $('<table id="todos">');
    let header = $('<tr class="todo"><th>Status</th><th>Description</th><th>Actions</th></tr>');
    newTable.append(header);
    for (let i = 0; i < list.length; i++) {
        let newRow = $(`<tr><td>x</td><td>${list[i].content}</td><td><button class="delete">Delete</button></td></tr>`);
        newRow.data(list[i]);
        newTable.append(newRow);
    }
    $('main').empty();
    $('main').append(newTable);
}
$(document).ready(start);

function start() {
    console.log('jq srced');

    getList();

    $('main').on('click', '.delete', deleteItem);
    $('#newButton').on('click', addItem);
    $('main').on('click', '.checkbox', updateStatus);
}

function updateStatus() {
    let id = $(this).closest('tr').data().id;
    let status = $(this).is(':checked');
    $.ajax({
        type: 'PUT',
        url: '/list/updateStatus',
        data: { id: id, status: status },
        success: function(response) {
            console.log('successfully sent', response);
            getList();
        },
        error: function(err) {
            console.log('error', err);
        }
    });
}

function addItem() {
    let content = $('#newContent').val();
    if (content === '') {
        alert('Task can\'t be empty');
    } else {
        $.ajax({
            type: 'POST',
            url: '/list',
            data: { content: content },
            success: function(response) {
                console.log('successfully sent', response);
                $('#newContent').val('');
                getList();
            },
            error: function(err) {
                console.log('error', err);
            }
        });
    }
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
    let header = $('<tr class="todo"><th colspan="2">Description</th><th>Actions</th></tr>');
    newTable.append(header);
    for (let i = 0; i < list.length; i++) {
        let newRow = $(`<tr><td><input type="checkbox"${list[i].status === true ? ' checked' : ''} class="checkbox"></input></td><td>${list[i].content}</td><td><button class="delete">Delete</button></td></tr>`);
        newRow.data(list[i]);
        newTable.append(newRow);
    }
    $('main').empty();
    $('main').append(newTable);
}
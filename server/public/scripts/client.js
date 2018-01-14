$(document).ready(start);

function start() {
    console.log('jq srced');

    getList();

    $('main').on('click', '.delete', deleteItem);
    $('#newButton').on('click', addItem);
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
                getList();
            },
            error: function(err) {
                console.log('error', err);
            }
        });
    }
    console.log(newData);
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
        console.log(list[i].status);
        let newRow = $(`<tr><td><input type="checkbox"${list[i].status === true ? ' checked' : ''}></input></td><td>${list[i].content}</td><td><button class="delete">Delete</button></td></tr>`);
        newRow.data(list[i]);
        newTable.append(newRow);
    }
    $('main').empty();
    $('main').append(newTable);
}
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
    'X-Client-Id': '3048'
    , 'X-Auth-Token': 'c73b0b40f77c279cbe7be6171b67edbd'
};
$(function () {
    $.ajaxSetup({
        headers: myHeaders
    });
    $.ajax({
        url: baseUrl + '/board'
        , method: 'GET'
        , success: function (response) {
            setupColumns(response.columns);
        }
        , error: function (response) {
            console.log('nie udalo się');
        }
    });
})

function setupColumns(columns) {
    console.log(columns.length);
    if (columns.length == 0) {
        // TWORZENIE NOWYCH EGZEMPLARZY KOLUMN
        createColumn('Do zrobienia');
        createColumn('W trakcie');
        createColumn('Zakończone');
    }
    else {
        columns.forEach(function (column) {
            var col = new Column(column.id, column.name);
            board.createColumn(col);
            setupCards(col, column.cards);
        });
    }
}

function setupCards(col, cards) {
    cards.forEach(function (card) {
        var cardObj = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
        col.createCard(cardObj);
    })
}
// OGÓLNA FUNKCJA
//function randomString() {
//    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ'.split();
//    var str = ''
//        , i;
//    for (i = 0; i < 10; i++) {
//        str += chars[Math.floor(Math.random() * chars.length)];
//    }
//    return str;
//}
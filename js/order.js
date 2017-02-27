
$(document).ready(function(){
    'use strict';
    $('.parallax').parallax();
    getItemData();
    submitKnapp();
});

// GVars
var totalOrder = 0;


// Börja: Event lyssnaren
function getItemData() {
    var card = $(".card");
    card.on("click", function() {
        var itemPrice = this.innerText.split("\n").filter(String);
        itemPrice.pop();
        updateTable(itemPrice);
    });
}

// lyssnaren submit knapp
function submitKnapp() {
    $("#submitBtn").on("click", function() {
        const $name = $('#name');
        const $phoneNumber = $('#phone');
        const $address = $('#address');
        var customerFormInfo = true;

        if ($name.val().trim() === '') {
            customerFormInfo = false;
            Materialize.toast('Enter a name.', 3500);
        }

        if ($phoneNumber.val().trim() === '') {
            customerFormInfo = false;
            Materialize.toast('Enter a phone number.', 3500);
        }

        if ($address.val().trim() === '') {
            customerFormInfo = false;
            Materialize.toast('Enter an address.', 3500);
        }

        if (totalOrder === 0) {
            customerFormInfo = false;
            var $toastContentF = $('<span>Please submit an order!</span>');
            Materialize.toast($toastContentF, 3500);
        }
        else if (totalOrder > 0 && customerFormInfo === true) {
            var $toastContentP = $('<span>Your order has been submitted!</span>');
            Materialize.toast($toastContentP, 3500);
        }

    });
}
// SLUTA: Event lyssnaren


// Uppdatera tabell
var priceArray = [];

// Lägg till rad i tabellen för varje
function updateTable(itemPrice) {
    var rowToAdd = `<tr><td>${itemPrice[0]}</td><td>${itemPrice[1]}</td><tr>`;
    priceArray.push((itemPrice[1].replace(/\$/g, '')));
    $('.table-body').append(rowToAdd);
    updateOrder(priceArray);
}
// Uppdatera summa
function updateOrder() {
    var subtotalOrder = priceArray.reduce(function(a,b) {
        return parseFloat(a) + parseFloat(b);
    });
    subtotalOrder = parseFloat(subtotalOrder).toFixed(2); // Delsumma
    var tax = parseFloat(subtotalOrder * 0.12).toFixed(2); // skatt
    totalOrder = parseFloat(subtotalOrder) + parseFloat(tax); // beräkna
    totalOrder = totalOrder.toFixed(2); // ställa decimal
    // rendera fjalt
    $('#subtotalOrder').html(`<td> SubtotalOrder: </td><td>$${subtotalOrder}</td>`);
    $('#tax').html(`<td> Tax: </td><td>$${tax}</td>`);
    $('#totalOrder').html(`<td>totalOrder: </td><td>$${totalOrder}</td>`);
}

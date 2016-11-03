/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart > .list");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок

    var itemToIncrement = Cart.filter(function(item) { return item.pizza == pizza && item.size == size })[0]

    if(itemToIncrement) {
        itemToIncrement.quantity++
    } else {
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });
    }

    console.log(Cart)

    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    Cart.splice(Cart.indexOf(cart_item), 1)

    //Після видалення оновити відображення
    updateCart();
}

function clearCart() {
    Cart = []

    updateCart()
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    
    if(localStorage['kma-pizza']) {
        Cart = JSON.parse(localStorage['kma-pizza'])
    }

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    
    localStorage['kma-pizza'] = JSON.stringify(Cart)


    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        console.log(cart_item)

        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".minus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity -= 1;

            if(cart_item.quantity == 0) {
                removeFromCart(cart_item)
            }

            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".remove").click(function(){
            removeFromCart(cart_item)

            //Оновлюємо відображення
            updateCart();
        });

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);

    $("#cart .header > .badge").html(Cart.length)

    if(Cart.length) {
        $("#total-sum").html("Сума замовлення: " + 
            Cart.map(function(x) { return x.pizza[x.size].price*x.quantity }).reduce(function(a, b) { return a + b }) +
                "грн"
        )
        $("#total-sum").css('opacity', 1)
    } else {
        $("#total-sum").css('opacity', 0)
    }
}

exports.removeFromCart = removeFromCart;
exports.clearCart = clearCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;
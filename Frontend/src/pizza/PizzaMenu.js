/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

var pizzaCategories = {
    "Усі": {
        label: "Усі піци",
        filter: function() { return true }
    },
    "Мясні": {
        label: "Мясні піци",
        filter: function(pizza) { return pizza.content.meat }
    },
    "З ананасами": {
        label: "Піци з ананасами",
        filter: function(pizza) { return pizza.content.pineapple }
    },
    "З грибами": {
        label: "Піци з грибами",
        filter: function(pizza) { return pizza.content.mushroom }
    },
    "З морепродуктами": {
        label: "Піци з морепродуктами",
        filter: function(pizza) { return pizza.content.ocean }
    },
    "Вега": {
        label: "Вегетаріанські піци",
        filter: function(pizza) { return pizza.type == 'Вега піца' }
    }
}

function filterPizza(category) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = Pizza_List.filter(pizzaCategories[category].filter)

    var header = $("#content > .header")
    header.children('h5').html(pizzaCategories[category].label)
    header.children('.badge').html(pizza_shown.length)

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;
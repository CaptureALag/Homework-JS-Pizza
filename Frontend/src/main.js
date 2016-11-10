/**
 * Created by chaika on 25.01.16.
 */

$(function(){
	var pizzaListExports = require('./Pizza_List')
	
	pizzaListExports.loadPizzaListFromServer(function() {
	    //This code will execute when the page is ready
	    var PizzaMenu = require('./pizza/PizzaMenu');
	    var PizzaCart = require('./pizza/PizzaCart');
	    var Pizza_List = pizzaListExports.pizzaList;

	    PizzaCart.initialiseCart();
	    PizzaMenu.initialiseMenu();

	    $(".filters > li").click(function() {
			var $this = $(this)
			$this.siblings().removeClass('active')
			$this.addClass('active')
			
			PizzaMenu.filterPizza($this.children('a').html())
		})

		$("#btn-clear-cart").click(function() {
			PizzaCart.clearCart()
		})
	})
});
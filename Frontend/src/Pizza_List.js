/**
 * Created by diana on 12.01.16.
 */

var pizza_info;

var API = require('./API')

function loadPizzaListFromServer(callback) {
    API.getPizzaList(function(_, data) {
        pizza_info = data;
        callback();
    });
}

function getPizzaList() {
    return pizza_info;
}

module.exports = {
    getPizzaList: getPizzaList,
    loadPizzaListFromServer: loadPizzaListFromServer
};



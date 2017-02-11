(function () {
    var module = angular.module('ShoppingListCheckOff', []);
    module.controller('ToBuyListController', ToBuyListController);
    module.controller('BoughtListController', BoughtListController);
    module.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


    ToBuyListController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyListController(ShoppingListCheckOffService) {
        var toBuy = this;

        toBuy.list = ShoppingListCheckOffService.toBuyList;

        toBuy.buyItem = function (item) {
            // find item
            var indexOfItem = toBuy.list.indexOf(item);

            // remove it from 'toBuy' list
            toBuy.list.splice(indexOfItem, 1);

            // add item to the 'bought' list
            ShoppingListCheckOffService.boughtList.push(item);

        };
    }

    BoughtListController.$inject = ['ShoppingListCheckOffService'];
    function BoughtListController(ShoppingListCheckOffService) {
        var bought = this;

        bought.list = ShoppingListCheckOffService.boughtList;
    }


    function ShoppingListCheckOffService() {
        var service = this;
        var starterList;

        initialize();
        function initialize() {

            service.boughtList = [];
            service.toBuyList = [];

            starterList = [];
            starterList.push(new Item('cookies', '10'));
            starterList.push(new Item('bananas', '2 bunches'));
            starterList.push(new Item('milk', '1 gallon'));
            starterList.push(new Item('eggs', '3 dozen'));
            starterList.push(new Item('butter', '1 pound'));

            starterList.forEach(function (item) {
                service.toBuyList.push(item);
            });
        }

        console.log(service.toBuyList);
    }

    // Item class
    function Item(name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }

    Item.prototype = {
        get description() {
            return this.quantity + ' ' + this.name;
        }
    };

})();
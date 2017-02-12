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
            ShoppingListCheckOffService.moveItemToBoughtList(item);
        };

        toBuy.addNewItem = function(qty, name){
            if(qty && name){
                toBuy.list.push(new Item(qty, name));
                toBuy.newQty = "";
                toBuy.newName = "";
            }
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
            starterList.push(new Item('10', 'cookies'));
            starterList.push(new Item('2 bunches', 'bananas'));
            starterList.push(new Item('1 gallon', 'milk'));
            starterList.push(new Item('3 dozen', 'eggs'));
            starterList.push(new Item('1 pound', 'butter'));

            starterList.forEach(function (item) {
                service.toBuyList.push(item);
            });
        }

        service.moveItemToBoughtList = function(item){
            // find item
            var indexOfItem = service.toBuyList.indexOf(item);

            // remove it from 'toBuy' list
            service.toBuyList.splice(indexOfItem, 1);

            // add item to the 'bought' list
            service.boughtList.push(item);
        };
    }

    // Item class
    function Item(quantity, name) {
        this.quantity = quantity;
        this.name = name;
    }

    Item.prototype = {
        get description() {
            return this.quantity + ' ' + this.name;
        }
    };

})();
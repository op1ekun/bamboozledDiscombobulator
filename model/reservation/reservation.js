define(['knockout', 'seatreservation'], function(ko, SeatReservation) {

    // Overall viewmodel for this screen, along with initial state
    function ReservationsViewModel() {
        var _this = this;

        // Non-editable catalog data - would come from the server
        _this.availableMeals = [
            { mealName: 'Standard (sandwich)', price: 0 },
            { mealName: 'StandardPlus (sandwich + soda)', price: 3.95 },
            { mealName: 'Premium (lobster)', price: 34.95 },
            { mealName: 'Ultimate (whole zebra)', price: 290 }
        ];

        // Editable data
        _this.seats = ko.observableArray([
            new SeatReservation('Steve', _this.availableMeals[0]),
            new SeatReservation('Bert', _this.availableMeals[1])
        ]);
        
        // this one is used in seats scope
        _this.mealInfo = function(meal) {
            return meal.mealName + ', ' + meal.price + ' EUR';
        };
        
        // a rather complicated way to read and use selectedIndex value
        ko.bindingHandlers.selectedIndex = {
            init: function(element, valueAccessor) {

                ko.utils.registerEventHandler(element, 'change', function() {
                    var value = valueAccessor();

                    if (ko.isWriteableObservable(value)) {
                       value(element.selectedIndex);
                    }
                });
            }
        };

        _this.passenger    = ko.observable('');
        _this.mealIndex    = ko.observable(0);
        
        _this.addReservation = function() {
            _this.seats.push(
                new SeatReservation(_this.passenger(), _this.availableMeals[_this.mealIndex()])
            );
        };
    }

    return ReservationsViewModel;
});
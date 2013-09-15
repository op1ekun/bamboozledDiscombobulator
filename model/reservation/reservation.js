define(['knockout', 'seatreservation'], function(ko, SeatReservation) {

    // Overall viewmodel for this screen, along with initial state
    function ReservationsViewModel() {
        var self = this;

        // Non-editable catalog data - would come from the server
        self.availableMeals = [
            { mealName: 'Standard (sandwich)', price: 0 },
            { mealName: 'StandardPlus (sandwich + soda)', price: 3.95 },
            { mealName: 'Premium (lobster)', price: 34.95 },
            { mealName: 'Ultimate (whole zebra)', price: 290 },
        ];

        // Editable data
        self.seats = ko.observableArray([
            new SeatReservation('Steve', self.availableMeals[0]),
            new SeatReservation('Bert', self.availableMeals[1])
        ]);
        
        self.mealInfo = function(meal) {
            return meal.mealName + ', ' + meal.price + ' EUR';
        };
        
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

        self.passenger    = ko.observable('');
        self.mealIndex    = ko.observable(0);
        
        self.addReservation = function() {
            self.seats.push(
                new SeatReservation(self.passenger(), self.availableMeals[self.mealIndex()])
            );
        };
    }

    ko.applyBindings(new ReservationsViewModel());
});
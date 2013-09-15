define(['knockout'], function(ko) {
    function SeatReservation(name, initialMeal) {
        var self  = this;
        self.name = name;
        self.meal = ko.observable(initialMeal);
    }

    return SeatReservation;
});
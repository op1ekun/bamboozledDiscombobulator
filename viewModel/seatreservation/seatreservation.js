define(['knockout'], function(ko) {
    function SeatReservation(name, initialMeal) {
        var _this  = this;
        _this.name = name;
        _this.meal = ko.observable(initialMeal);
    }

    return SeatReservation;
});
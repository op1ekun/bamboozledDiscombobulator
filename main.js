require.config({
    basePath: '.',
    paths: {
        'knockout'          : '//cdnjs.cloudflare.com/ajax/libs/knockout/2.3.0/knockout-min',
        'reservation'       : 'model/reservation/reservation',
        'seatreservation'   : 'model/seatreservation/seatreservation'
    }
});

require(['knockout', 'reservation'], function(ko, ReservationModel) {
    ko.applyBindings(new ReservationModel());

    document
        .querySelector('body')
        .className = "";
});
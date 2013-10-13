require.config({
    basePath: '.',
    paths: {
        'knockout'          : '//cdnjs.cloudflare.com/ajax/libs/knockout/2.3.0/knockout-min',
        'reservation'       : 'viewModel/reservation/reservation',
        'seatreservation'   : 'viewModel/seatreservation/seatreservation',
        'meals'             : 'model/meals/meals'
    }
});

require(['knockout', 'reservation'], function(ko, ReservationModel) {
    ko.applyBindings(new ReservationModel());

    // show the body
    document
        .querySelector('body')
        .className = "";
});
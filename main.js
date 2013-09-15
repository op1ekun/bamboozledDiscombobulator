require.config({
    basePath: '.',
    paths: {
        'knockout'          : '//cdnjs.cloudflare.com/ajax/libs/knockout/2.3.0/knockout-min',
        'reservation'       : 'model/reservation/reservation',
        'seatreservation'   : 'model/seatreservation/seatreservation'
    }
});

require(['reservation'], function(reservationModel) {
    document
        .querySelector('body')
        .className = "";
});
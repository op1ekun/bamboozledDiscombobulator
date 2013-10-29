!(function(global) {
    'use strict';

    function EventEmitter() {
        // 
        var pubsub = new global.app.components.PubSub();

        this.on         = function(notification, callback) {
            return pubsub.subscribe(notification, callback);
        };

        this.off        = function(id) {
            return pubsub.unsubscribe(id);
        };

        this.publish    = function(notification, args) {
            pubsub.publish(notification, args);
        };
    }

    global.app.components.EventEmitter = EventEmitter;

})(this);
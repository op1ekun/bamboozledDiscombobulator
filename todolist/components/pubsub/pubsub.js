!(function(global) {
    'use strict';

    function PubSub() {

            // store subsribers
        var subscribers = {},
            // start unique ids from 1
            uniqueId    = 1;

        this.subscribe = function(notification, callback) {
            if (!subscribers[notification]) {
                subscribers[notification] = [];
            }

            var id = uniqueId.toString();
            uniqueId++;

            subscribers[notification].push({
                id          : id,
                callback    : callback
            });

            return id;
        };
     
        this.publish = function(notification, args) {
            var list    = subscribers[notification];
            
            if (!list) {
                return false;
            }

            // run callback asynchronously
            setTimeout(function() {
                // loop through the list of subcsribers
                for (var i = 0, l = list.length; i <l; i++) {
                    list[i].callback(notification, args);
                }
            }, 0);

            return true;
        };
     
        this.unsubscribe = function(id) {
            for (var notification in subscribers) {

                for (var i = 0, l = subscribers[notification].length; i < l; i++) {
                    if (subscribers[notification][i].id === id) {
                        subscribers[notification].splice(i, 1);
                        return id;
                    }
                }
            }

            return false;
        };
    }

    global.app.components.PubSub = PubSub;

})(this);
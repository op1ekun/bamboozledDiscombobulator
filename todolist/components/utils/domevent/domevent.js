!(function(global) {
    'use strict';

    global.app.components.utils.DOMEvent = {
        on : function(target, eventName, callback) {
            if (target.addEventListener) {
                // to simplify things events will bubble in every browser
                target.addEventListener(eventName, callback, false);
            }
            else {
                target.attachEvent(eventName, callback);
            }
        },
        off : function(target, eventName, callback) {
            if (target.removeEventListener) {
                // to simplify things events will bubble in every browser
                target.removeEventListener(eventName, callback, false);
            }
            else {
                target.detachEvent(eventName, callback);
            }
        }
    };

})(this);
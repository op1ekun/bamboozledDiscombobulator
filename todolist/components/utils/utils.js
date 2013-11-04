!(function(global) {
    'use strict';

    global.app.components.Utils = {
        attachDOMEvent  : function(target, eventName, callback) {
            if (target.addEventListener) {
                // to simplify things events will bubble in every browser
                target.addEventListener(eventName, callback, false);
            }
            else {
                target.attachEvent(eventName, callback);
            }
        },
        detachDOMEvent      : function(target, eventName, callback) {
            if (target.removeEventListener) {
                // to simplify things events will bubble in every browser
                target.removeEventListener(eventName, callback, false);
            }
            else {
                target.detachEvent(eventName, callback);
            }
        },
        // simplified version
        // dispatchKeyEvent    : function(target, key) {
        //     var ev;

        //     if (document.createEvent) {
        //         ev = document.createEvent('KeyboardEvent');
        //         if (ev.initKeyEvent) {
        //             ev.initKeyEvent('keypress', true, true, window, false, false, false, false, key, 0);
        //         }
        //         else {
        //             ev.initKeyboardEvent('keypress', true, true, window, key, 0, '', false, 'en');
        //         }

        //         return !target.dispatchEvent(ev);
        //     }
        //     else {
        //         ev = document.createEventObject('KeyboardEvent');
        //         ev.initKeyboardEvent('keypress', true, true, window, key, 0, '', false, 'en');

        //         return target.fireEvent('on' + eventName, ev);
        //     }
        // },
        dispatchEvent       : function(target, eventName) {
            var ev;

            if (document.createEvent) {
                // dispatch event for firefox
                ev = document.createEvent('HTMLEvents');
                // event type, bubbling, cancelable
                ev.initEvent(eventName, true, true);

                return !target.dispatchEvent(ev);
            }
            else {
                // dispatch event for IE
                ev = document.createEventObject();

                return target.fireEvent('on' + eventName, ev);
            }
        }
    };

})(this);
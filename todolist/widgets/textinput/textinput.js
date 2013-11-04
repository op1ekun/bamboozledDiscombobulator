!(function(global, EventEmitter, utils) {
    'use strict';

    function TextInput(config) {
        if (!config) {
            throw new ReferenceError('config is undefined');
        }

        if (!config.node) {
            throw new ReferenceError('config.node is undefined');
        }
        else if (!config.node.nodeName) {
            throw new TypeError('config.node is not a DOM element');
        }

        if (config.label && !config.id) {
            throw new ReferenceError('config.id is undefined');
        }

        EventEmitter.call(this);

        this._node  = config.node;
        this._label = config.label;
        this._id    = config.id;
        this._name  = config.name;
        this._value = config.value || '';
    }

    TextInput.prototype.render  = function() {
        var _this       = this;
            
        _this._inputElem        = document.createElement('input');
        _this._inputElem.type   = 'text';

        if (_this._name) {
            _this._inputElem.name = _this._name;
        }

        if (_this._label) {
            var labelElem       = document.createElement('label');
            labelElem.innerHTML = _this._label;
            labelElem.htmlFor   = _this._id;
            _this._inputElem.id = _this._id;
            _this._node.appendChild(labelElem);
        }

        _this._inputElem.value     = _this._value;

        utils.attachDOMEvent(_this._inputElem, 'focus', function() {
            _this.publish('focus');
        });

        utils.attachDOMEvent(_this._inputElem, 'keypress', function(ev) {

            if (ev.which === 13 && this.value !== '') {
                _this.publish('change', this.value);
            }
        });

        _this._node.appendChild(_this._inputElem);

        _this.publish('render');
    };

    TextInput.prototype.destroy = function() {
        // TODO detach events

        this._node.innerHTML = '';
        this.publish('destroy');
    };

    TextInput.prototype.getValue = function() {
        return this._inputElem.value;
    };

    TextInput.prototype.setValue = function(val) {
        this._inputElem.value = val;
    };


    global.app.widgets.TextInput = TextInput;

})(this, this.app.components.EventEmitter, this.app.components.Utils);
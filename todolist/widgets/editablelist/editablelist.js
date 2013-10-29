!(function(global, EventEmitter) {
    'use strict';

    function validateInput(config) {
        if (!config) {
            throw new ReferenceError('config is undefined');
        }

        if (!config.node) {
            throw new ReferenceError('config.node is undefined');
        }
        else if (!config.node.nodeName) {
            throw new TypeError('config.node is not a DOM element');
        }

        if (!config.items) {
            throw new ReferenceError('config.items is undefined');
        }
    }

    function EditableList(config) {
        validateInput(config);

        EventEmitter.call(this);
        
        // "private" properties
        // they should not be used directly
        // USE AT YOUR OWN RISK ;)
        this._node      = config.node;
        this._items     = config.items;
        this._editable  = (config.editable ? config.editable : true);
    }

    EditableList.prototype.render   = function() {
        var _this       = this,
            items       = _this._items;

        _this._listNode             = document.createElement('ul');
        _this._listNode.className   = 'list';

        for (var i = 0, l = items.length; i < l; i++) {
            _this.addItem(items[i]);
        }

        _this._node.appendChild(_this._listNode);

        _this.publish('ready');
    };

    EditableList.prototype.destroy  = function() {
        // TODO detach events!
        // 
        // clear node
        this._node.innerHTML = '';
        this.publish('destroy');
    };

    EditableList.prototype.addItem  = function(config) {
        if (!this._listNode) {
            throw new ReferenceError('list node is undefined, call render method first')
        }

        if (!config) {
            throw new ReferenceError('config is undefined');
        }
        else if (!config.id) {
            throw new ReferenceError('config.id is undefined');
        }

        var itemTmpl    = '<li data-id="{{id}}">{{content}}</li>';

        this._listNode
            .innerHTML += itemTmpl
                            .replace('{{id}}', config.id)
                            .replace('{{content}}', config.content);
    };

    EditableList.prototype.removeItem  = function() {
    };

    global.app.widgets.EditableList = EditableList;

})(this, this.app.components.EventEmitter);

!(function(global, EventEmitter) {
    'use strict';

    function EditableList(config) {
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

        EventEmitter.call(this);
        
        // "private" properties
        // they should not be used directly
        // USE AT YOUR OWN RISK ;)
        this._node      = config.node;
        this._items     = config.items;
        this._editable  = (config.editable ? config.editable : true);

        this._renderedItems = {};
    }

    EditableList.prototype.render   = function() {
        var items       = this._items;

        this._listNode             = document.createElement('ul');
        this._listNode.className   = 'list';

        for (var i = 0, l = items.length; i < l; i++) {
            this.addItem(items[i]);
        }

        this._node.appendChild(this._listNode);

        this.publish('render');
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
            throw new ReferenceError('list node is undefined, call render method first');
        }

        if (!config) {
            throw new ReferenceError('config is undefined');
        }
        else if (!config.id) {
            throw new ReferenceError('config.id is undefined');
        }

        var itemNode        = document.createElement('li');
        itemNode.innerHTML  = config.content;
        itemNode.setAttribute('data-id', config.id);

        this._listNode.appendChild(itemNode);
        this._renderedItems[config.id] = itemNode;

        this.publish('item-add', config.id);
        return config.id;
    };

    EditableList.prototype.removeItem  = function(id) {
        var item = this._renderedItems[id];
        if (item) {
            item.parentNode.removeChild(item);
            delete this._renderedItems[id];

            this.publish('item-remove', id);
            return true;
        }

        return false;
    };

    global.app.widgets.EditableList = EditableList;

})(this, this.app.components.EventEmitter);

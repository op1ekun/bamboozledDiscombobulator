!(function(global, EventEmitter) {
 
    function Storage(namespace) {
        if (!namespace) {
            throw new ReferenceError('namespace is undefined');
        }

        EventEmitter.call(this);

        this._namespace = namespace;

        if (!global.localStorage.getItem(this._namespace)) {
            // initialize Storage
            localStorage.setItem(this._namespace, JSON.stringify({}));
        }
    }

    Storage.prototype.add       = function(id, item) {
        var storageData = JSON.parse(localStorage.getItem(this._namespace));
        storageData[id] = item;

        try {
            localStorage.setItem(this._namespace, JSON.stringify(storageData));
            this.publish('item-add', item);
        }
        // simplified version
        catch(e) {
            // chrome and firefox
            // if (e.name === 'QuotaExceededError' || 
            //     e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            throw new ReferenceError('localStorage is full');
            // }
        }
    };

    Storage.prototype.get       = function(id) {
        var storageData = JSON.parse(localStorage.getItem(this._namespace));
        return storageData[id];
    };

    Storage.prototype.getAll    = function() {
        return storageData = JSON.parse(localStorage.getItem(this._namespace));
    }

    Storage.prototype.remove    = function(id) {
        var storageData = JSON.parse(localStorage.getItem(this._namespace));

        delete storageData[id];
        
        localStorage.setItem(this._namespace, JSON.stringify(storageData));
        this.publish('item-remove', id);
    };

    Storage.prototype.destroy   = function() {
        localStorage.removeItem(this._namespace);
        this.publish('destroy');
    };

    global.app.components.Storage = Storage;

})( this,
    this.app.components.EventEmitter);

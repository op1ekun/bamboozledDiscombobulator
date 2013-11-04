!(function(global) {
    'use strict';

    describe('Storage component', function() {

        it('should be a part of the global scope', function() {
            expect(global.app.components.Storage).toBeTruthy();
            expect(global.app.components.Storage instanceof Function).toBeTruthy();
        });

        it('should NOT instantiate without the namespace variable', function() {
            expect(function() {
                new global.app.components.Storage();
            }).toThrow(new ReferenceError('namespace is undefined'));
        });

        it('should expose add, get, getAll, remove, and destroy methods', function() {
            var storage = new global.app.components.Storage('storageTest');

            expect(storage.add instanceof Function).toBeTruthy();
            expect(storage.get instanceof Function).toBeTruthy();
            expect(storage.getAll instanceof Function).toBeTruthy();
            expect(storage.remove instanceof Function).toBeTruthy();
            expect(storage.destroy instanceof Function).toBeTruthy();

            // in case destroy is not implemented
            global.localStorage.removeItem('storageTest');
        });

        describe('Storage manipulation', function() {
            var storage;

            beforeEach(function() {
                storage = new global.app.components.Storage('storageTest');
            });

            afterEach(function() {
                storage.destroy();
            });

            it('should be able to add, get, and remove items in the the existing namespace', function() {
                storage.add('testItem1', {
                    id      : 'testItem1',
                    content : 'testContent'
                });
                expect(storage.get('testItem1')).toEqual({
                    id      : 'testItem1',
                    content : 'testContent'
                });

                storage.remove('testItem1');
                expect(storage.get('testItem1')).toBeFalsy();
            });

            it('should be able to get all items from exsiting namespace', function() {
                storage.add('testItem1', {
                    id      : 'testItem1',
                    content : 'testContent1'
                });

                storage.add('testItem2', {
                    id      : 'testItem2',
                    content : 'testContent2'
                });

                expect(storage.getAll()).toEqual({
                    'testItem1' : {
                        id      : 'testItem1',
                        content : 'testContent1'
                    },
                    'testItem2' : {
                        id      : 'testItem2',
                        content : 'testContent2'
                    }
                });
            });

            it('should destory the namespace when it is destroyed', function() {
                storage.destroy();

                var storageData = JSON.parse(global.localStorage.getItem('storageTest'));
                expect(storageData).toBeFalsy();
            });

            it('should publish the "item-add" event when item is added to the namespace', function() {
                spyOn(storage, 'publish');

                storage.add('testItem1', {
                    id      : 'testItem1',
                    content : 'testContent'
                });

                expect(storage.publish).toHaveBeenCalledWith('item-add', {
                    id      : 'testItem1',
                    content : 'testContent'
                });
            });

            it('should publish the "item-remove" event when item is removed to the namespace', function() {
                spyOn(storage, 'publish');

                storage.remove('testItem1');

                expect(storage.publish).toHaveBeenCalledWith('item-remove', 'testItem1');
            });

            it('should throw an exception when it is full', function() {
                var largeItem = 'qwertyui';

                // js (so in fact localStorage) stores strings as UTF-16 (16bit per character)
                // so this should be roughly about 5000 characters
                while(largeItem.length < 1024 * 1024 * 10) {
                    largeItem += largeItem;
                }

                expect(function() {
                    storage.add('largeItem', largeItem);
                }).toThrow(new RangeError('localStorage is full'));
            });

        });
    });

})(this);
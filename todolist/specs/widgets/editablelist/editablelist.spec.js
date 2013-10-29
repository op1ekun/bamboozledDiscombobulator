!(function(global) {
    'use strict';

    describe('EditableList widget', function() {

        // no AMD, CommonJS etc.
        it('should be a part of the global scope', function() {
            expect(global
                    .app
                    .widgets
                    .EditableList).toBeTruthy();

            expect(global
                    .app
                    .widgets
                    .EditableList instanceof Function).toBeTruthy();
        });

        it('should NOT instantiate without the config object', function() {
            expect(function() {
                var list = new global
                                .app
                                .widgets
                                .EditableList();
            }).toThrow(new ReferenceError('config is undefined'));
        });
        
        // widget renders into the node element
        it('should NOT instantiate without the config.node DOM element', function() {
            expect(function() {
                var list = new global
                                .app
                                .widgets
                                .EditableList({});
            }).toThrow(new ReferenceError('config.node is undefined'));
            
            expect(function() {
                var list = new global
                                .app
                                .widgets
                                .EditableList({
                                    node : {}
                                });
            }).toThrow(new TypeError('config.node is not a DOM element'));
        });

        it('should NOT instantiate without the config.items object', function() {
            expect(function() {
                var list = new global
                                .app
                                .widgets
                                .EditableList({
                                    node : document.querySelector('.editablelist'),
                                });
            }).toThrow(new ReferenceError('config.items is undefined'));
        });

        it('should expose render, destroy, on, off, addItem, and removeItem methods', function() {
            var list = new global
                            .app
                            .widgets
                            .EditableList({
                                node    : document.querySelector('.editablelist'),
                                items   : [
                                    {
                                        id      : '123',
                                        content : 'some simple text content'
                                    },
                                ]
                            });

            expect(list.render instanceof Function).toBeTruthy();
            expect(list.destroy instanceof Function).toBeTruthy();
            expect(list.on instanceof Function).toBeTruthy();
            expect(list.off instanceof Function).toBeTruthy();
            expect(list.addItem instanceof Function).toBeTruthy();
            expect(list.removeItem instanceof Function).toBeTruthy();
        });

        describe('List Manipulation', function() {
            var node, list;

            beforeEach(function() {
                node = document.querySelector('.editablelist');
                list = new global.app.widgets.EditableList({
                    node        : node,
                    items   : [
                        {
                            id      : '123',
                            content : 'some simple text content'
                        },
                        {
                            id      : '234',
                            content : 'another simple text contet'
                        }
                    ],
                    // no UI is provided to edit, delete etc.
                    editable    : false
                });
            });

            afterEach(function() {
                list.destroy();
            });

            it('should render into the provided DOM node', function() {
                list.render();

                // state verification
                expect(node.querySelectorAll('ul.list').length).toEqual(1);
                expect(node.querySelectorAll('li[data-id]').length).toEqual(2);
            });

            it('should publish the "ready" event when finished', function() {
                var spy = spyOn(list, 'publish');

                list.render();

                // behaviour verification
                expect(list.publish).toHaveBeenCalledWith('ready');
            });

            it('should NOT add item if an invalid config is provided for the addItem method', function() {
                list.render();
                
                expect(function() {
                    list.addItem();
                }).toThrow(new ReferenceError('config is undefined'));

                expect(function() {
                    list.addItem({});
                }).toThrow(new ReferenceError('config.id is undefined'));
            });

            it('should add item if a valid config is provided for the addItem method', function() {
                list.render();
                
                var result = list.addItem({
                    id      : '345',
                    content : 'more test content'
                });

                expect(result).toEqual('345');
                expect(node.querySelectorAll('li[data-id]').length).toEqual(3);
            });

            it('should publish the "item-add" event if item was successfully added', function() {
                var spy = spyOn(list, 'publish');

                list.render();
                var result = list.addItem({
                    id      : '456',
                    content : 'even more test content'
                });

                // behaviour verification
                expect(list.publish).toHaveBeenCalledWith('item-add', '456');
            });

            it('should remove an existing item if a valid id is provided for removeIdem method', function() {
                list.render();

                var result = list.removeItem();
                expect(result).toBeFalsy();
                
                // not existent item
                result = list.removeItem('1248');
                expect(result).toBeFalsy();

                result = list.removeItem('234');
                expect(result).toBeTruthy();
                expect(node.querySelectorAll('li[data-id]').length).toEqual(1);
            });

            it('should publish the "item-remove" event if item was successfully removed', function() {
                var spy = spyOn(list, 'publish');

                list.render();
                list.remove('234');

                // behaviour verification
                expect(list.publish).toHaveBeenCalledWith('item-remove', '234');
            });

            it('should be removed from the provided DOM node when is destroyed', function() {
                list.render();
                list.destroy();

                expect(node.querySelectorAll('ul.list').length).toEqual(0);
            });

            it('should publish the "destroy" event when list is destroyed', function() {
                var spy = spyOn(list, 'publish');

                list.render();
                list.destroy();

                expect(list.publish).toHaveBeenCalledWith('destroy');
            });
        });
    });

})(this);
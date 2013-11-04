!(function(global, utils) {
    'use strict';

    describe('TextInput widget', function() {

        it('should be a part of the global scope', function() {
            expect(global.app.widgets.TextInput).toBeTruthy();
            expect(global.app.widgets.TextInput instanceof Function).toBeTruthy();
        });

        it('should NOT instantiate without the config object', function() {
            expect(function() {
                new global.app.widgets.TextInput();
            }).toThrow(new ReferenceError('config is undefined'));
        });

        it('should NOT instantiate without the config.node DOM element', function() {
            expect(function() {
                new global.app.widgets.TextInput({});
            }).toThrow(new ReferenceError('config.node is undefined'));

            expect(function() {
                new global.app.widgets.TextInput({
                    node : {}
                });
            }).toThrow(new TypeError('config.node is not a DOM element'));
        });

        it('should expose render, destroy, getValue, and setValue methods', function() {
            var textinput = new global.app.widgets.TextInput({
                node : document.querySelector('.textinput')
            });

            expect(textinput.render instanceof Function).toBeTruthy();
            expect(textinput.destroy instanceof Function).toBeTruthy();
            expect(textinput.getValue instanceof Function).toBeTruthy();
            expect(textinput.setValue instanceof Function).toBeTruthy();
        });

        describe('Rendering', function() {
            var node;

            beforeEach(function() {
                node = document.querySelector('.textinput');
            });

            afterEach(function() {
                node.innerHTML = '';
            });

            it('should render into a provided DOM node', function() {
                var textinput = new global.app.widgets.TextInput({
                    node : node
                });

                textinput.render();

                expect(node.querySelectorAll('input[type="text"]').length).toEqual(1);
            });

            it('should require config.id if config.label was provided', function() {
                expect(function() {
                    var textinput = new global.app.widgets.TextInput({
                        node    : node,
                        label   : 'TextInput label'
                    });
                }).toThrow(new ReferenceError('config.id is undefined'));
            });

            it('should render a label with the "for" attribute and has the "id" attribute if config.label and config.id are provided', function() {
                var textinput = new global.app.widgets.TextInput({
                    node    : node,
                    label   : 'TextInput label',
                    id      : 'testId',
                    value   : 'some value'
                });

                textinput.render();

                expect(node.querySelectorAll('label[for="testId"]').length).toEqual(1);
                expect(node.querySelectorAll('input[id="testId"]').length).toEqual(1);
                expect(node.querySelector('input[id="testId"]').value).toEqual('some value');
            });

            it('should render with a name attribute if config.name is provided', function() {
                var textinput = new global.app.widgets.TextInput({
                    node    : node,
                    name    : 'someName'
                });

                textinput.render();

                expect(node.querySelectorAll('input[name="someName"]').length).toEqual(1);
            });

            it('should publish the "render" event when finished', function() {

                var textinput = new global.app.widgets.TextInput({
                    node    : node,
                    name    : 'someName'
                });

                spyOn(textinput, 'publish');

                textinput.render();

                expect(textinput.publish).toHaveBeenCalledWith('render');
            });

        });

        describe('Widget manipulation', function() {
            var node, textinput;

            beforeEach(function() {
                node        = document.querySelector('.textinput');
                textinput   = new global.app.widgets.TextInput({
                    node    : node,
                    label   : 'TextInput label',
                    id      : 'testId',
                    name    : 'someName',
                    value   : 'initial value'
                });
            });

            afterEach(function() {
                textinput.destroy();
            });

            it('should publish the "focus" event when there is a focus on the input field', function() {
                textinput.render();

                var inputElem = node.querySelector('input');

                spyOn(textinput, 'publish');

                utils.dispatchEvent(inputElem, 'focus');
                
                expect(textinput.publish).toHaveBeenCalledWith('focus');
            });

            // it('should publish the "change" event when the value of the input field changes', function() {
            //     textinput.render();

            //     var inputElem = node.querySelector('input');

            //     spyOn(textinput, 'publish');

            //     inputElem.value = 'some change';
            //     utils.dispatchKeyEvent(inputElem, 13);
            //     expect(textinput.publish).toHaveBeenCalledWith('change');

            //     inputElem.value = 'more change';
            //     utils.dispatchEvent(inputElem, 'blur');
            //     expect(textinput.publish).toHaveBeenCalledWith('change');
            // });
            
            it('should be able to retrieve or change value of the inner text field', function() {
                textinput.render();

                expect(textinput.getValue()).toEqual('initial value');

                textinput.setValue('12816');
                expect(node.querySelector('input').value).toEqual('12816');
            });
             
            it('should be removed from the provided DOM node when is destroyed', function() {
                textinput.render();
                textinput.destroy();

                expect(node.querySelectorAll('label').length).toEqual(0);
                expect(node.querySelectorAll('input').length).toEqual(0);
            });

            it('should publish the "destroy" event when widget is destroyed', function() {
                spyOn(textinput, 'publish');

                textinput.render();
                textinput.destroy();

                expect(textinput.publish).toHaveBeenCalledWith('destroy');
            });
        });

    });

})(this, this.app.components.Utils);
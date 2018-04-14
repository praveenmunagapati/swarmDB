const reset = require('./reset');
const assert = require('assert');

const path = require('path');

const api1 = require('../api');

delete require.cache[path.resolve(__dirname + '/../communication.js')];
delete require.cache[path.resolve(__dirname + '/../api.js')];

const api2 = require('../api');


describe('multi-client bluzelle api', () => {

    beforeEach(reset);

    beforeEach(() =>
        api1.connect('ws://localhost:8100', '7777'));

    beforeEach(() =>
        api2.connect('ws://localhost:8100', '8888'));

    // beforeEach(() => {
    //     // api1.connect('ws://localhost:8100', '2222');
    //     // api2.connect('ws://localhost:8100', '3333');
    //     return [api1.connect('ws://localhost:8100', '2222'), api2.connect('ws://localhost:8100', '3333')];
    // });


    // it('should have different api objects', () => {
    //
    //     assert(api1 !== api2);
    //
    // });

    // it('should connect', () => {
    // })

    it('api1 should be able to create and read number fields', async () => {
        api1.setup();
        await api1.update('myKey', 123);
        assert(await api1.read('myKey') === 123);

    });

    it('api2 should be able to create and read number fields', async () => {
        api2.setup();
        await api2.update('myKey', 123);
        assert(await api2.read('myKey') === 123);

    });

});

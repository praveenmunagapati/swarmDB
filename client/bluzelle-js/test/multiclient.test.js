const reset = require('./reset');
const assert = require('assert');

const path = require('path');

const api1 = require('../api');

delete require.cache[path.resolve(__dirname + '/../communication.js')];
delete require.cache[path.resolve(__dirname + '/../api.js')];

const api2 = require('../api');


describe('multi-client bluzelle api', () => {

    beforeEach(reset);

    beforeEach(async () => {
        await api1.connect('ws://localhost:8100', '9999');
        api1.setup();

        await api2.connect('ws://localhost:8100', '8888');
        api2.setup();
    });

    afterEach(() => {
        api1.disconnect();
        api2.disconnect();
    });


    it('api1 should be able to create and read number fields', async () => {
        await api1.update('myKey', 123);
        assert(await api1.read('myKey') === 123);
    });

    it('api2 should be able to create and read number fields', async () => {
        await api2.update('myKey', 123);
        assert(await api2.read('myKey') === 123);
    });

});

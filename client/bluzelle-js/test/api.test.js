const reset = require('./reset');
const api = require('../api');
const assert = require('assert');


describe.only('bluzelle api', function() {

    beforeEach(reset);

    beforeEach( async function() {
        await api.connect('ws://localhost:8100', '9999');
        // api.setup();
    });
    afterEach(() =>
        api.disconnect());



    it('should be able to create and read number fields', async () => {
        await api.update('myKey', 123);
        assert(await api.read('myKey') === 123);

    });

    it('should be able to create and read text fields', async () => {

        await api.update('myOtherKey', "hello world");
        assert(await api.read('myOtherKey') === "hello world");

    });

    it('should be able to create and read object fields', async () => {

        await api.update('myObjKey', { a: 5 });
        assert((await api.read('myObjKey')).a === 5);

    });

});

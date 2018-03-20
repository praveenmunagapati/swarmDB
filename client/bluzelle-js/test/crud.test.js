const emulator = require('./emulator/Emulator');
const api = require('../api');
const assert = require('assert');


beforeEach(() => {

    emulator.reset();

});


it('should be able to reset', () => {});


describe('bluzelle connection', () => {

    beforeEach(() =>
        api.connect('localhost:8100'));

    afterEach(() =>
        api.disconnect());


    it('should be able to connect to 8100', () => {});


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

    it('should be able to query if the database has a key', async () => {

        await api.update('myKey', 123);
        assert(await api.has('myKey'));
        assert(!await api.has('someOtherKey'));

    });

    it('should be able to delete a key', async () => {

        await api.update('myKey');
        await api.delete('myKey');
        assert(!await api.has('myKey'));

    });

    it('should throw an error when trying to read a non-existent key', async () => {

        assert((await api.read('something')).error);

    });

    it('should throw an error when trying to delete a non-existent key', async () => {

        assert((await api.delete('something')).error);

    });

});


describe('multiple client tests', () => {



});
const reset = require('./reset');
const communication = require('../communication');
const assert = require('assert');


describe('bluzelle connection', () => {

    beforeEach(reset);

    beforeEach( async () => {
        await communication.connect('ws://localhost:8100', '71e2cd35-b606-41e6-bb08-f20de30df76c');
        communication.setup();
    });

    afterEach(() =>
        communication.disconnect());


    it('should be able to connect to 8100', () => {});


    it('should be able to ping the connection', async () => {
        return communication.ping();

    });

    it('should be able to read and update base64 strings', async () => {

        await communication.update('mykey', 'abcdef');

        assert(await communication.read('mykey') === 'abcdef')

    });

    it('should be able to query if the database has a key', async () => {

        await communication.update('myKey', 'abc');
        assert(await communication.has('myKey'));
        assert(!await communication.has('someOtherKey'));

    });

    it('should be able to delete a key', async () => {

        await communication.update('myKey', 'abc');
        await communication.delete('myKey');
        assert(!await communication.has('myKey'));

    });

    it('should throw an error when trying to read a non-existent key', done => {

        communication.read('abc123').catch(() => done());

    });

    it('should throw an error when trying to delete a non-existent key', done => {

        communication.delete('something').catch(() => done());

    });

});

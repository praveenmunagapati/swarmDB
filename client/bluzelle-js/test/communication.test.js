const emulator = require('./emulator/Emulator');
const communication = require('../communication');
const assert = require('assert');


beforeEach(() => {

    emulator.reset();

});


it('should be able to reset', () => {});


describe('bluzelle connection', () => {

    beforeEach(() =>
        communication.connect('localhost:8100'));

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


});
const emulator = require('./emulator/Emulator');
const api = require('../api');

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



});
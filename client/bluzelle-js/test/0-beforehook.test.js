const reset = require('./reset');
const communication = require('../communication');
const api = require('../api');
const assert = require('assert');


// Global reset for whole testing suite
beforeEach(reset);

describe('reset', () => {

    describe('in node environment', () => {

        beforeEach(async () =>
            await communication.connect('ws://localhost:8100', '2222'));

        afterEach(() =>
            communication.disconnect());

        it('can add a key', async () => {
            await communication.update('myKey', 'abc');
            assert(await communication.has('myKey'));
            assert(!await communication.has('someOtherKey'));
        });

        it('should not have key from previous test', async () => {
            assert(!await communication.has('myKey'));
        });
    });

    describe('in browser environment', () => {

        beforeEach(() =>
            api.connect('ws://localhost:8100', '2222'));

        afterEach(() =>
            api.disconnect());

        it('can add a key', async () => {
            await api.update('myOtherKey', "hello world");
            assert(await api.read('myOtherKey') === "hello world");
        });

        it('should not have key from previous test', async () => {
            await assertThrowsAsync(async () => await api.read('myOtherKey'), /Error/);
        });
    });

});

async function assertThrowsAsync(fn, regExp) {
    let f = () => {};
    try {
        await fn();
    } catch(e) {
        f = () => {throw e};
    } finally {
        assert.throws(f, regExp);
    }
};

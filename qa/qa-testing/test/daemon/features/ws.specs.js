const WebSocket = require('ws');
const waitUntil = require('async-wait-until');
const get = require('lodash/get');

let socket, messages;

describe('web sockets interface', () => {

    beforeEach((done) => {
        messages = [];
        socket = new WebSocket('ws://localhost:49152');
        socket.on('open', done);
        socket.on('message', message => messages.push(JSON.parse(message)));
    });

    describe('ping', () => {
        it('should respond with pong', async () => {
            socket.send('{ "bzn-api" : "ping" }');
            await waitUntil(() => get(messages, '[0].bzn-api') === 'pong');
        })
    });

    afterEach(() => socket.close());
});

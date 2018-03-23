const WebSocket = require('ws');
const waitUntil = require('async-wait-until');
const get = require('lodash/get');
const cmd = require('node-cmd');

let socket, messages;

describe('web sockets interface', () => {

    beforeEach((done) => {
        cmd.run('cd ../../; yarn run-daemon'); // Working directory originates to where Chimp is called)
        browser.pause(500);
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

    afterEach(() => {
        socket.close();
        cmd.run('cd ../../; yarn daemon-kill');
    });
});

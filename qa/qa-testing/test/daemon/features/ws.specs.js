import WebSocket from 'ws';
import waitUntil from 'async-wait-until';
import {get} from 'lodash';
import cmd from 'node-cmd';
import {logFileExists, logFileMoved} from '../utils.js';

let socket, messages, logFileName;

describe('web sockets interface', () => {

    beforeEach( async done => {
        cmd.run('cd ../../; yarn run-daemon');
        await waitUntil(() => logFileName = logFileExists());

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

    afterEach( async () => {
        socket.close();
        cmd.run('cd ../../; yarn daemon-kill');
        await waitUntil( () => logFileMoved(logFileName));
    });
});

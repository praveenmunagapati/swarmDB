import fs from 'fs';
import cmd from 'node-cmd';
import waitUntil from 'async-wait-until';
import {logFileExists, logFileMoved} from '../utils.js';
import {PATH_TO_DAEMON} from './00-setup';

let logFileName;

describe('daemon', () => {

    beforeEach( async () => {
        cmd.run('cd ../../; yarn run-daemon'); // Working directory originates to where Chimp is called)
        await waitUntil( () => logFileName = logFileExists());

        cmd.run('cd ../../; yarn daemon-kill');
        await waitUntil( () => logFileMoved(logFileName));
    });

    describe('on startup', () => {
        it('should create a log', () =>
            expect(readFile(logFileName)).to.have.string('Loading: bluzelle.json')
        );
    });

    describe('on shutdown', () => {
       it('should log "shutting down"', () =>
           expect(readFile(logFileName)).to.have.string('signal received -- shutting down')
       );
    });

    afterEach(() => logFileName = '');
});

const readFile = logFileName =>
    fs.readFileSync(PATH_TO_DAEMON + '/daemon/logs/' + logFileName, 'utf8');

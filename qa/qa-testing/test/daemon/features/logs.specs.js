import waitUntil from 'async-wait-until';
import {PATH_TO_DAEMON} from './00-setup';
import {logFileExists, logFileMoved} from '../utils.js';
import fs from 'fs';
import {exec}  from 'child_process';

let logFileName;

describe('daemon', () => {

    beforeEach( async () => {
        exec('cd ../../; yarn run-daemon'); // Working directory originates to where Chimp is called)
        await waitUntil( () => logFileName = logFileExists());

        exec('cd ../../; yarn daemon-kill');
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

const util = require('util');
const execPromisified = util.promisify(require('child_process').exec);
const {exec} = require('child_process');
import waitUntil from "async-wait-until";
import {PATH_TO_DAEMON} from './00-setup';
import {logFileExists, logFileMoved} from '../utils.js';
import fs from 'fs';

describe('cmd line', () => {

    describe('accepts flags', () => {

        it('-h', async () => {
            await execAndRead(`./swarm -h`, 'stdout', 'Shows this information');
        });

        it('-v', async () => {
            await execAndRead(`./swarm -v`, 'stdout', 'Bluzelle:');
        });

        it('-c', async () => {
            await execAndRead(`./swarm -c`,' stderr', "ERROR: the required argument for option '--config' is missing");
        });

        it('-a', async () => {
            await execAndRead(`./swarm -a 0x006eae72077449caca91078ef78552c0cd9bce8f`,' stderr', "Missing listener address entry");
        });

        it('-l', async () => {
            await execAndRead(`./swarm -l 127.0.0.1`,' stderr', "Invalid listener port entry");
        });

        it('-p', async () => {
            await execAndRead(`./swarm -p 49152`,' stderr', "Missing listener address entry");
        });
    });

    describe('successfully connects', () => {

        describe('with no flags, defaults to ./bluzelle.json', () => {

            before( async () => {
                exec(`cd ${PATH_TO_DAEMON}/daemon; ./swarm`);
                await waitUntil(() => logFileName = logFileExists());
                log = readFile(logFileName);
            });

            it('logs ethereum address from ./bluzelle.json', async () => {
                expect(log).to.have.string('"ethereum" : "0x006eae72077449caca91078ef78552c0cd9bce8f"');
            });

            it('logs listener_address from ./bluzelle.json', async () => {
                expect(log).to.have.string('"listener_address" : "127.0.0.1"');
            });

            it('logs listener_port from ./bluzelle.json', async () => {
                expect(log).to.have.string('"listener_port" : 49152');
            });
        });

        let log, logFileName;

        describe('passing -a -l -p', () => {

            before( async () => {
                exec(`cd ${PATH_TO_DAEMON}/daemon; ./swarm -a 0xf88CD1943406a0A6c1492C35Bb0eE645CD7eA656 -l 127.0.0.1 -p 49155`);
                await waitUntil(() => logFileName = logFileExists());
                log = readFile(logFileName);
            });

            it('logs ethereum address passed', async () => {
                expect(log).to.have.string('"ethereum" : "0xf88CD1943406a0A6c1492C35Bb0eE645CD7eA656"');
            });

            it('logs listener_address passed', async () => {
                expect(log).to.have.string('"listener_address" : "127.0.0.1"');
            });

            it('logs listener_port passed', async () => {
                expect(log).to.have.string('"listener_port" : 49155');
            });
        });

        after( async () => {
            exec('cd ../../; yarn daemon-kill');
            await waitUntil( () => logFileMoved(logFileName));
        });
    });
});

const execAndRead = async (cmd, output, expected) => {
    const {stdout, stderr} = await execPromisified(`cd ${PATH_TO_DAEMON}/daemon;` + cmd);
    output = eval(output);
    expect(output).to.have.string(expected);
};

const readFile = logFileName =>
    fs.readFileSync(PATH_TO_DAEMON + '/daemon/' + logFileName, 'utf8');

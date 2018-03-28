import waitUntil from "async-wait-until";
import {PATH_TO_DAEMON} from './00-setup';
import {logFileExists, logFileMoved, readFile} from '../utils.js';
import util from 'util';
import {exec}  from 'child_process';
const execPromisified = util.promisify(exec);

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

        let log, logFileName;

        describe('with no flags, defaults to ./bluzelle.json', () => {

            before( async () => {
                exec(`cd ${PATH_TO_DAEMON}/daemon; ./swarm`);
                await waitUntil(() => logFileName = logFileExists());
                log = readFile('/daemon/', logFileName);
            });

            it('logs loading ./bluzelle.json', () => {
                expect(log).to.have.string('Loading: bluzelle.json');
            });

            it('logs ethereum address', async () => {
                expect(log).to.have.string('"ethereum" : "0x006eae72077449caca91078ef78552c0cd9bce8f"');
            });

            it('logs listener_address', async () => {
                expect(log).to.have.string('"listener_address" : "127.0.0.1"');
            });

            it('logs listener_port', async () => {
                expect(log).to.have.string('"listener_port" : 49152');
            });

            it('logs reading peers', async () => {
                expect(log).to.have.string('Reading peers from');
            });

            it('logs individual peers', async () => {
                expect(log).to.have.string('Found peer 123.45.67.123:50000 (fake_1)');
            });

            it('logs number of peers found', async () => {
                expect(log).to.have.string('Found 3 new peers');
            });

            after( async () => {
                exec('cd ../../; yarn daemon-kill');
                await waitUntil( () => logFileMoved(logFileName));
            });
        });

        describe('with -c ./bluzelle-bootstrap-url.json', () => {

            before( async () => {
                exec(`cd ${PATH_TO_DAEMON}/daemon; ./swarm -c ./bluzelle-bootstrap-url.json`);
                await waitUntil(() => logFileName = logFileExists());
                log = readFile('/daemon/', logFileName);
                browser.pause(300); // timing issue when daemon downloads peer list
            });

            it('logs loading ./bluzelle-bootstrap-url.json', () => {
               expect(log).to.have.string('Loading: ./bluzelle-bootstrap-url.json');
            });

            it('logs ethereum address', async () => {
                expect(log).to.have.string('"ethereum" : "0x006eae72077449caca91078ef78552c0cd9bce8f"');
            });

            it('logs listener_address', async () => {
                expect(log).to.have.string('"listener_address" : "127.0.0.1"');
            });

            it('logs listener_port', async () => {
                expect(log).to.have.string('"listener_port" : 49200');
            });

            it('logs reading peers', async () => {
                expect(log).to.have.string('Downloaded peer list from pastebin.com/raw/mbdezA9Z');
            });

            it('logs individual peers', async () => {
                expect(log).to.have.string('Found peer 79.80.44.60:51000 (jack)');
            });

            it('logs number of peers found', async () => {
                expect(log).to.have.string('Found 4 new peers');
            });

            after( async () => {
                exec('cd ../../; yarn daemon-kill');
                await waitUntil( () => logFileMoved(logFileName));
            });
        });


        describe('with -a -l -p -b ./peers.json', () => {

            before( async () => {
                exec(`cd ${PATH_TO_DAEMON}/daemon; ./swarm -a 0xf88CD1943406a0A6c1492C35Bb0eE645CD7eA656 -l 127.0.0.1 -p 49155 -b ./peers.json`);
                await waitUntil(() => logFileName = logFileExists());
                log = readFile('/daemon/', logFileName);
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

            it('logs reading peers', async () => {
                expect(log).to.have.string('Reading peers from');
            });

            it('logs individual peers', async () => {
                expect(log).to.have.string('Found peer 123.45.67.123:50000 (fake_1)');
            });

            it('logs number of peers found', async () => {
                expect(log).to.have.string('Found 3 new peers');
            });

            after( async () => {
                exec('cd ../../; yarn daemon-kill');
                await waitUntil( () => logFileMoved(logFileName));
            });

        });

        describe('with -a -l -p -bootstrap_url', () => {

            before( async () => {
                exec(`cd ${PATH_TO_DAEMON}/daemon; ./swarm -a 0xf88CD1943406a0A6c1492C35Bb0eE645CD7eA656 -l 127.0.0.1 -p 49155 --bootstrap_url pastebin.com/raw/mbdezA9Z`);
                await waitUntil(() => logFileName = logFileExists());
                log = readFile('/daemon/', logFileName);
                browser.pause(200); // timing issue when daemon downloads peer list
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

            it('logs reading peers', async () => {
                expect(log).to.have.string('Downloaded peer list from pastebin.com/raw/mbdezA9Z');
            });

            it('logs individual peers', async () => {
                expect(log).to.have.string('Found peer 79.80.44.60:51000 (jack)');
            });

            it('logs number of peers found', async () => {
                expect(log).to.have.string('Found 4 new peers');
            });

            after( async () => {
                exec('cd ../../; yarn daemon-kill');
                await waitUntil( () => logFileMoved(logFileName));
            });

        });

    });
});

const execAndRead = async (cmd, output, expected) => {
    const {stdout, stderr} = await execPromisified(`cd ${PATH_TO_DAEMON}/daemon;` + cmd);
    output = eval(output);
    expect(output).to.have.string(expected);
};

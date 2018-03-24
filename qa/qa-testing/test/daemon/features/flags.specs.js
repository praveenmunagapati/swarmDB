// import {exec} from 'child_process';
const { exec } = require('child_process');
import waitUntil from 'async-wait-until';
import {logFileExists, logFileMoved} from '../utils.js';
import {PATH_TO_DAEMON} from './00-setup';
import {filter, includes} from 'lodash';


let logFileName, capture;

describe('cmd line',() => {

    describe('accepts flags', () => {
        it.only('-h', () => {
            // browser.pause(500);


            exec(`cd ${PATH_TO_DAEMON}/daemon; ./swarm -h`, (error, stdout, stderr) => capture = stdout);
            browser.pause(200);

            console.log('capture: ', capture);
            expect(capture).to.have.string('Shows this information');
        });

    });

    // describe('loads ./bluzelle.json as default config file', async () => {
    //     cmd.run(`cd ${PATH_TO_DAEMON}; ./swarm`);
    //     await waitUntil(() => logFileName = logFileExists());
    // });
    //
    // describe('accepts -l -a -p ', () => {
    // });

});

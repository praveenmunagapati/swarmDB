const util = require('util');
const exec = util.promisify(require('child_process').exec);
import {PATH_TO_DAEMON} from './00-setup';
import {filter, includes} from 'lodash';


describe('cmd line', () => {

    describe('accepts flags', () => {
        it('-h', async () => {
            await testStdOut(`cd ${PATH_TO_DAEMON}/daemon; ./swarm -h`, 'Shows this information');
        });

        it('-v', async () => {
            await testStdOut(`cd ${PATH_TO_DAEMON}/daemon; ./swarm -v`, 'Bluzelle:');
        });

        // it('-c', async () => {
        //     await testStdOut(`cd ${PATH_TO_DAEMON}/daemon; ./swarm -c`, 'is missing');
        // });

        // it.only('no flags', async () => {
        //     await testStdOut(`cd ${PATH_TO_DAEMON}/daemon; ./swarm`, 'Running node');
        // });

    });
});

async function testStdOut(cmd, expected) {
    const {stdout, stderr} = await exec(cmd);
    expect(stdout).to.have.string(expected);
}

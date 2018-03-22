const fs = require('fs');


describe('daemon', () => {

    beforeEach(() => {
    //    start daemon
    //    stop daemon
    });

    describe('on startup', () => {
        it('should create a log', () => {
            let contents = fs.readFileSync(lastLog(), 'utf8');
            expect(contents).to.have.string('Loading: bluzelle.json');
        });
    });

    describe('on shutdown', () => {
       it('should log "shutting down"', () => {
           let contents = fs.readFileSync(lastLog(), 'utf8');
           expect(contents).to.have.string('signal received -- shutting down');
       });
    });
});

const lastLog = () => {
    const PATH_TO_DAEMON = '../../../../../daemon-build';
    let dirContents = fs.readdirSync(PATH_TO_DAEMON + '/daemon/logs/');
    return PATH_TO_DAEMON + '/daemon/logs/' + dirContents[dirContents.length - 1];
};

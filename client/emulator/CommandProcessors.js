const {maxNodes} = require('./Values');
const {read, update, destroy, requestKeyList} = require('./DataStore');
const {getAllNodesInfo} = require('./NodeStore.js');


const CommandProcessors = {
    setMaxNodes: num => maxNodes.set(num),
    requestAllNodes: ({data}, connection) =>
        connection.send(JSON.stringify({cmd: 'updateNodes', data: getAllNodesInfo()})),
    
    ping: ({request_id}, ws) => 
        ws.send(JSON.stringify({
            response_to: request_id
        }))
};


module.exports = CommandProcessors;
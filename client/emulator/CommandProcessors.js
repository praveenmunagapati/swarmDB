const {maxNodes} = require('./Values');
const {read, update, requestKeyList} = require('./DataStore');
const {getAllNodesInfo} = require('./NodeStore.js');

module.exports = {
    setMaxNodes: num => maxNodes.set(num),
    requestAllNodes: (data, connection) =>
        connection.send(JSON.stringify({cmd: 'updateNodes', data: getAllNodesInfo()})),
    read,
    update,
    // delete
    // aggregate
    requestKeyList
};

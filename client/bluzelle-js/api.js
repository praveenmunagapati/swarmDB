//
// Library interactions (ES5)
// ====================
// // Wraps websocket communcations
// // Keeps a cache
// import * from 'bluzelle/communication';
// connect('ws://127.0.0.1:3000');
// read(key)  // Returns promise
// update(key, bytearray)
// delete(key)
// keys()     // Returns promise
// disconnect();
// // Translates from bytearrays to JS objects
// import * from 'bluzelle/api';
// update(key, string)
// update(key, json)
// update(key, binary file)

const WebSocket = require('isomorphic-ws');

const connections = new Set();


const connect = addr => {

    const s = new WebSocket(addr);

    s.onopen = () => connections.add(s);
    s.onclose = () => connections.delete(s);
    s.onerror = () => s.close();

    s.onmessage = () => onMessage(s);

};

const onMessage = socket =>
    null;

const disconnect = () => {
    for(let connection of connections.values()) {
        connection.close();
    }
};

const update = (key, value) =>
    null;

const remove = key =>
    null;

const read = key =>
    null;


module.exports = {
    connect,
    disconnect,
    read,
    update,
    remove
};
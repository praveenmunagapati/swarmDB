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


const ping = () => new Promise(resolve => {
     
});


const connect = addr => {

    const s = new WebSocket(addr);

    s.onopen = () => connections.add(s);
    s.onclose = () => connections.delete(s);
    s.onerror = () => s.close();

    s.onmessage = e => onMessage(e, s);

};


const onMessage = (event, socket) =>
    null;


const disconnect = () => {
    for(let connection of connections.values()) {
        connection.close();
    }
};

const send = (cmd, data) => {
    for(let connection of connections.values()) {
        connection.send(JSON.parse({cmd, data}));
    }
};


const update = (key, value) => new Promise(resolve => {

    send('update', {
        key,
        value
    });

});


const delet = key => new Promise(resolve => {

    send('delete', {key});

});


const read = key => new Promise(resolve => {

    send('read', {key});

});


const has = key => new Promise(resolve => {

    send('has', {key});

});


module.exports = {
    connect,
    disconnect,
    ping,

    read,
    update,
    'delete': delet, // delete is a reserved keyword
    has
};



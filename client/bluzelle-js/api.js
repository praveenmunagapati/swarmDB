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

    s.onmessage = e => onMessage(e, s);

};


const onMessage = (event, socket) =>
    command(JSON.parse(ev.data), socket);


const command = (obj, socket) => {

    obj.cmd === 'aggregate' && aggregate(obj, socket);
    obj.cmd === 'update' && onUpdate(obj, socket);
    obj.cmd === 'destroy'  && onDestroy(obj, socket);

};

const aggregate = (obj, socket) =>
    obj.data.forEach(cmd => command(cmd, socket));


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

const update = (key, value) =>
    send('update', {
        key,
        value
    });

const destroy = key =>
    send('destroy', {key});

const read = key =>
    send('read', {key});


module.exports = {
    connect,
    disconnect,

    read,
    update,
    destroy,

    onUpdate,
    onDestroy
};



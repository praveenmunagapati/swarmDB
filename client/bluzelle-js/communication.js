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
const resolvers = new Map();


const ping = () => new Promise(resolve => {

});


const connect = addr => {

    const s = new WebSocket(addr);

    s.onopen = () => connections.add(s);
    s.onclose = () => connections.delete(s);
    s.onerror = () => s.close();

    s.onmessage = e => onMessage(e, s);

};


const onMessage = (event, socket) => {

    resolvers.get(event.response_to)(event);
    resolvers.delete(event.response_to);

};



const disconnect = () => {
    for(let connection of connections.values()) {
        connection.close();
    }
};


const amendBznApi = obj =>
    Object.assign(obj, {
        'bzn-api': 'crud'
    });


const amendRequestID = (() => {

    let requestIDCounter = 0;

    return obj =>
        Object.assign(obj, {
            'request_id': requestIDCounter++
        });

})();


const send = obj => {

    const message = () =>
        JSON.parse(
            amendRequestID(
                amendBznApi(obj)
            )
        );


    for(let connection of connections.values()) {
        connection.send(message);
    }

    return message;

};


const update = (key, value) => new Promise((resolve, reject) => {

    const message = send({
        cmd: 'update',
        data: {
            key,
            value
        }
    });


    resolvers.set(message.request_id, obj =>
        obj.hasKey('error') ? reject(obj.error) : resolve());

});


const delet = key => new Promise(resolve => {

    const message = send({
        cmd: 'delete',
        data: {
            key
        }
    });


    resolvers.set(message.request_id, obj =>
        obj.hasKey('error') ? reject(obj.error) : resolve());

});


const read = key => new Promise(resolve => {

    const message = send({
        cmd: 'read',
        data: {
            key
        }
    });


    resolvers.set(message.request_id, obj =>
        obj.hasKey('error') ? reject(obj.error) : resolve(obj.data.value));

});


const has = key => new Promise(resolve => {

    const message= send({
        cmd: 'has',
        data: {
            key
        }
    });


    resolvers.set(message.request_id, resolve);

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



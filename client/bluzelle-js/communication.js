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

    send({
        cmd: 'ping',
        'bzn-api': 'ping'
    }, obj => resolve());

});


const connect = addr => {

    return new Promise(resolve => {

        const s = new WebSocket(addr);

        s.onopen = () => {

            connections.add(s);
            resolve(s);

        };

        s.onclose = () => connections.delete(s);
        s.onerror = e =>  {

            s.close();
            console.error(e);

        }

        s.onmessage = e => onMessage(JSON.parse(e.data), s);

    });

};


const onMessage = (event, socket) => {

    debugger;

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


const send = (obj, resolver) => {

    const message = amendRequestID(obj);

    resolvers.set(message.request_id, resolver);

    for(let connection of connections.values()) {
        connection.send(JSON.stringify(message));
    }
};


const update = (key, value) => new Promise((resolve, reject) => {

    const cmd = amendBznApi({
        cmd: 'update',
        data: {
            key, value
        }
    });


    const message = send(cmd);


    resolvers.set(message.request_id, obj =>
        obj.hasKey('error') ? reject(obj.error) : resolve());

});


const delet = key => new Promise(resolve => {

    const cmd = amendBznApi({
        cmd: 'delete',
        data: {
            key
        }
    });

    const message = send(cmd);


    resolvers.set(message.request_id, obj =>
        obj.hasKey('error') ? reject(obj.error) : resolve());

});


const read = key => new Promise(resolve => {

    const cmd = amendBznApi({
        cmd: 'read',
        data: {
            key
        }
    });


    const message = send(cmd);


    resolvers.set(message.request_id, obj =>
        obj.hasKey('error') ? reject(obj.error) : resolve(obj.data.value));

});


const has = key => new Promise(resolve => {

    const cmd = amendBznApi({
        cmd: 'has',
        data: {
            key
        }
    });

    const message= send(cmd);


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


